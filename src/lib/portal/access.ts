export type PlataformaDoUsuario = {
  id: string;
  slug: string;
  platform: string;
  category: string | null;
  name: string;
  description: string | null;
  status: "active" | "development" | "disabled";
  url: string | null;
  accessRole: string | null;
  permissionStatus: "active" | "blocked" | "pending" | null;
};

export function temAcesso(plataforma: PlataformaDoUsuario) {
  return plataforma.status === "active" &&
    plataforma.permissionStatus === "active";
}

// Nunca permite executar javascript: ou links não-HTTPS vindos do banco.
export function urlSegura(valor: string | null): string | null {
  if (!valor) return null;
  try {
    const url = new URL(valor);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
