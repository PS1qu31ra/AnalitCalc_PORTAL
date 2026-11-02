import { neon } from '@neondatabase/serverless';
import { userFromRequest } from '../server/auth';

// Esta API deve rodar SOMENTE no servidor (Vercel Functions).
// O navegador nunca recebe DATABASE_URL ou acesso direto ao PostgreSQL.

type ProfilePayload = {
  fullName?: unknown;
  institution?: unknown;
  profileType?: unknown;
  profileTypeOther?: unknown;
  areaCode?: unknown;
  areaOther?: unknown;
  academicLevel?: unknown;
  professionalExperienceRange?: unknown;
  primaryGoal?: unknown;
  countryCode?: unknown;
  countryOther?: unknown;
  stateCode?: unknown;
  discoverySource?: unknown;
  discoverySourceOther?: unknown;
};

const ALLOWED_PROFILE_TYPES: ReadonlySet<string> = new Set([
  'student',
  'faculty',
  'researcher',
  'lab_technician',
  'lab_professional',
  'industry_professional',
  'other',
] as const);

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const NO_STORE = { 'Cache-Control': 'private, no-store, max-age=0' };

function valueAsString(value: unknown, limit: number): string | null | undefined {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string' || value.length > limit) return undefined;
  return value.trim() || null;
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400, headers: NO_STORE });
}

async function handle(request: Request): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'POST') {
    return Response.json({ error: 'Método não permitido' }, {
      status: 405,
      headers: { ...NO_STORE, Allow: 'GET, POST' },
    });
  }

  const { PORTAL_DATABASE_URL, NEON_AUTH_BASE_URL, NEON_AUTH_JWKS_URL } = process.env;
  if (!PORTAL_DATABASE_URL || !NEON_AUTH_BASE_URL || !NEON_AUTH_JWKS_URL) {
    return Response.json({ error: 'Configuração pendente no servidor' }, {
      status: 503,
      headers: NO_STORE,
    });
  }

  const userId = await userFromRequest(request);
  if (!userId || !UUID_REGEX.test(userId)) {
    return Response.json({ error: 'Sessão inválida' }, { status: 401, headers: NO_STORE });
  }

  const sql = neon(PORTAL_DATABASE_URL);

  try {
    if (request.method === 'GET') {
      // Consulta somente dados relacionados ao usuário do JWT verificado no servidor.
      // As tres instrucoes executam NA MESMA transacao, evitando que o
      // contexto de usuario vaze ou se perca entre conexoes HTTP.
      // Apenas o servidor escolhe o UUID, a partir do JWT verificado.
      const [, profiles, apps] = await sql.transaction([
        sql`SELECT set_config('analit.user_id', ${userId}, true)`,
        sql`SELECT full_name, institution, profile_type
            FROM public.user_profiles
            WHERE auth_user_id = ${userId}::uuid
            LIMIT 1`,
        sql`SELECT a.id::text AS id, a.slug, a.name, a.description, a.status, a.url,
                   p.access_role AS "accessRole", p.status AS "permissionStatus"
            FROM public.apps AS a
            LEFT JOIN public.user_app_permissions AS p
              ON p.app_id = a.id AND p.auth_user_id = ${userId}::uuid
            WHERE a.status <> 'disabled'
            ORDER BY CASE WHEN a.status = 'active' THEN 0 ELSE 1 END, a.name`,
      ]);
      return Response.json({ perfil: profiles[0] ?? null, plataformas: apps }, {
        headers: NO_STORE,
      });
    }

    const raw = await request.text();
    if (raw.length > 12_000) return badRequest('Dados enviados excedem o limite permitido');

    let data: ProfilePayload;
    try {
      data = JSON.parse(raw) as ProfilePayload;
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return badRequest('JSON inválido');
      }
    } catch {
      return badRequest('JSON inválido');
    }

    const name = valueAsString(data.fullName, 160);
    const institution = valueAsString(data.institution, 200);
    const profileType = valueAsString(data.profileType, 50);

    if (!name || name.length < 3 || !institution || !profileType ||
        !ALLOWED_PROFILE_TYPES.has(profileType)) {
      return badRequest('Nome, instituição ou categoria de perfil inválidos');
    }

    // Nunca aceitar "admin" como categoria de cadastro público.
    // Os nomes destes campos correspondem exatamente às colunas atuais do Neon.
    const other = {
      profileTypeOther: valueAsString(data.profileTypeOther, 200),
      areaCode: valueAsString(data.areaCode, 120),
      areaOther: valueAsString(data.areaOther, 200),
      academicLevel: valueAsString(data.academicLevel, 120),
      professionalExperienceRange: valueAsString(data.professionalExperienceRange, 120),
      primaryGoal: valueAsString(data.primaryGoal, 200),
      countryCode: valueAsString(data.countryCode, 8),
      countryOther: valueAsString(data.countryOther, 200),
      stateCode: valueAsString(data.stateCode, 8),
      discoverySource: valueAsString(data.discoverySource, 120),
      discoverySourceOther: valueAsString(data.discoverySourceOther, 200),
    };

    if (Object.values(other).some((value) => value === undefined)) {
      return badRequest('Um ou mais campos complementares estão inválidos');
    }

    await sql.transaction([
      sql`SELECT set_config('analit.user_id', ${userId}, true)`,
      sql`INSERT INTO public.user_profiles (
      auth_user_id, full_name, institution, profile_type,
      profile_type_other, area_code, area_other, academic_level,
      professional_experience_range, primary_goal, country_code,
      country_other, state_code, discovery_source, discovery_source_other,
      profile_completed_at
    ) VALUES (
      ${userId}::uuid, ${name}, ${institution}, ${profileType},
      ${other.profileTypeOther}, ${other.areaCode}, ${other.areaOther},
      ${other.academicLevel}, ${other.professionalExperienceRange},
      ${other.primaryGoal}, ${other.countryCode}, ${other.countryOther},
      ${other.stateCode}, ${other.discoverySource},
      ${other.discoverySourceOther}, now()
    )
    ON CONFLICT (auth_user_id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      institution = EXCLUDED.institution,
      profile_type = EXCLUDED.profile_type,
      profile_type_other = EXCLUDED.profile_type_other,
      area_code = EXCLUDED.area_code,
      area_other = EXCLUDED.area_other,
      academic_level = EXCLUDED.academic_level,
      professional_experience_range = EXCLUDED.professional_experience_range,
      primary_goal = EXCLUDED.primary_goal,
      country_code = EXCLUDED.country_code,
      country_other = EXCLUDED.country_other,
      state_code = EXCLUDED.state_code,
      discovery_source = EXCLUDED.discovery_source,
      discovery_source_other = EXCLUDED.discovery_source_other,
      profile_completed_at = COALESCE(public.user_profiles.profile_completed_at, now()),
      updated_at = now()`,
    ]);

    // IMPORTANTE: o próprio usuário NÃO pode liberar acesso a aplicativos.
    // Somente processos administrativos autorizados poderão gravar
    // public.user_app_permissions. Nenhuma permissão é criada aqui.
    return Response.json({ ok: true }, { headers: NO_STORE });
  } catch (err) {
    console.error('Erro interno em /api/me:', err);
    return Response.json({ error: 'Falha ao consultar ou salvar os dados da conta' }, {
      status: 500,
      headers: NO_STORE,
    });
  }
}

export default { fetch: handle };
