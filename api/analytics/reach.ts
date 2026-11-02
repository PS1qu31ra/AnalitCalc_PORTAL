import { neon } from '@neondatabase/serverless';

// Apenas agregados publicos permitidos pela policy RLS.
// O papel restrito nao le eventos individuais nem dados de perfis.
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== 'GET')
      return Response.json({ ok: false }, { status: 405, headers: { Allow: 'GET' } });

    const connectionString = process.env.PORTAL_DATABASE_URL;
    if (!connectionString)
      return Response.json({ ok: false, countries: [] }, { status: 503 });

    try {
      const sql = neon(connectionString);
      const countries = await sql`
        SELECT lower(dimension_value) AS country, sum(visitors)::int AS value
        FROM public.analytics_legacy
        WHERE dimension_type = 'country'
          AND data_source = 'legacy_spreadsheet'
          AND length(dimension_value) = 2
        GROUP BY lower(dimension_value)
        ORDER BY value DESC
      `;
      return Response.json({ ok: true, countries }, {
        headers: { 'Cache-Control': 'public, max-age=60' },
      });
    } catch (error) {
      console.error('Falha na consulta publica de alcance:', error);
      return Response.json({ ok: false, countries: [] }, { status: 500 });
    }
  },
};
