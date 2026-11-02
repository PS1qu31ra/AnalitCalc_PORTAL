import type { CadastroDados } from "./tipos";
import { authenticatedFetch } from "../auth/client";

const STORAGE_KEY = "analit-pending-profile";
type PendingProfile = { email: string; data: Omit<CadastroDados, "password" | "confirmPassword"> };

// Só dados complementares; senha NUNCA vai para sessionStorage.
export function guardarPerfilPendente(data: CadastroDados) {
  const { password: _password, confirmPassword: _confirm, ...safeData } = data;
  const payload: PendingProfile = { email: data.email.trim().toLowerCase(), data: safeData };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
export async function concluirPerfilPendente(emailAutenticado: string) {
  const bruto = sessionStorage.getItem(STORAGE_KEY);
  if (!bruto) return;
  let pendente: PendingProfile;
  try { pendente = JSON.parse(bruto); } catch { sessionStorage.removeItem(STORAGE_KEY); return; }
  if (pendente.email !== emailAutenticado.trim().toLowerCase()) return;
  const res = await authenticatedFetch('/api/me', { method: 'POST', body: JSON.stringify(pendente.data) });
  if (!res.ok) throw new Error('Não foi possível salvar o perfil complementar.');
  sessionStorage.removeItem(STORAGE_KEY);
}
