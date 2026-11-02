import { createRemoteJWKSet, jwtVerify } from 'jose';

let cachedUrl: string | undefined;
let cachedJwks: ReturnType<typeof createRemoteJWKSet> | undefined;

export async function userFromRequest(request: Request): Promise<string | null> {
  const authBase = process.env.NEON_AUTH_BASE_URL;
  const jwksUrl = process.env.NEON_AUTH_JWKS_URL;
  if (!authBase || !jwksUrl) throw new Error('AUTH_SERVER_NOT_CONFIGURED');
  const header = request.headers.get('authorization');
  if (!header?.toLowerCase().startsWith('bearer ')) return null;
  try {
    if (cachedUrl !== jwksUrl || !cachedJwks) {
      cachedUrl = jwksUrl;
      cachedJwks = createRemoteJWKSet(new URL(jwksUrl));
    }
    const { payload } = await jwtVerify(header.slice(7).trim(), cachedJwks, {
      issuer: new URL(authBase).origin,
    });
    return typeof payload.sub === 'string' && payload.sub.length > 0 ? payload.sub : null;
  } catch {
    return null;
  }
}
