import type { CadastroDados } from "./tipos";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../firebase";

const STORAGE_KEY = "analit-pending-profile";
type SafeProfile = Omit<CadastroDados, "password" | "confirmPassword">;
type PendingProfile = { email: string; data: SafeProfile };

// Nunca copia senha para a planilha, sessionStorage ou Firestore.
export function guardarPerfilPendente(data: CadastroDados) {
  const { password: _password, confirmPassword: _confirm, ...safeData } = data;
  const payload: PendingProfile = {
    email: data.email.trim().toLowerCase(), data: safeData,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export async function concluirPerfilPendente(emailAutenticado: string) {
  if (!firebaseAuth || !firebaseDb || !firebaseAuth.currentUser) {
    throw new Error("Firebase nao configurado ou usuario nao autenticado.");
  }
  const bruto = sessionStorage.getItem(STORAGE_KEY);
  if (!bruto) return;
  let pendente: PendingProfile;
  try {
    pendente = JSON.parse(bruto) as PendingProfile;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return;
  }
  const email = firebaseAuth.currentUser.email?.trim().toLowerCase();
  if (!email || pendente.email !== email || email !== emailAutenticado.trim().toLowerCase()) return;
  const d = pendente.data;
  await setDoc(doc(firebaseDb, "userProfiles", firebaseAuth.currentUser.uid), {
    fullName: d.fullName.trim(),
    email,
    institution: d.institution.trim(),
    profileType: d.profileType,
    profileTypeOther: d.profileTypeOther,
    areaCode: d.areaCode,
    areaOther: d.areaOther,
    academicLevel: d.academicLevel,
    professionalExperienceRange: d.professionalExperienceRange,
    primaryGoal: d.primaryGoal,
    countryCode: d.countryCode,
    countryOther: d.countryOther,
    stateCode: d.stateCode,
    discoverySource: d.discoverySource,
    discoverySourceOther: d.discoverySourceOther,
    updatedAt: serverTimestamp(),
  }, { merge: true });
  sessionStorage.removeItem(STORAGE_KEY);
}
