
export type PlataformaDoUsuario = {
  id: string;
  slug: string;
  platform: string;
  category: string | null;
  name: string;
  description: string | null;
  status: "active" | "development" | "disabled";
  url: string | null;
  accessMode: "public" | "restricted";
  accessRole: string | null;
  permissionStatus: "active" | "blocked" | "pending" | null;
};

export function temAcesso(plataforma: PlataformaDoUsuario) {
  if (plataforma.status !== "active") return false;

  if (plataforma.accessMode === "public") return true;

  return plataforma.permissionStatus === "active";
}

export function urlSegura(valor: string | null): string | null {
  if (!valor) return null;
  try {
    const url = new URL(valor);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
