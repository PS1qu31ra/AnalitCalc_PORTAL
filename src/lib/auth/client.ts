import { createAuthClient } from "@neondatabase/auth";
import { BetterAuthReactAdapter } from "@neondatabase/auth/react/adapters";

// A URL do serviço é pública; não coloque DATABASE_URL aqui.
const url = import.meta.env.VITE_NEON_AUTH_URL?.trim();
export const authClient = url ? createAuthClient(url, { adapter: BetterAuthReactAdapter() }) : null;

export async function authenticatedFetch(path: string, options: RequestInit = {}) {
  if (!authClient) throw new Error("Neon Auth não configurado.");
  const token = await authClient.getJWTToken();
  if (!token) throw new Error("Sessão ausente ou expirada. Entre novamente.");
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData)) headers.set("Content-Type", "application/json");
  return fetch(path, { ...options, headers, cache: "no-store" });
}
