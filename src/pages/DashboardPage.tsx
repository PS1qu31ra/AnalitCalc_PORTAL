import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../lib/firebase";
import type { PlataformaDoUsuario } from "../lib/portal/access";
import { PainelUsuario } from "../components/painel/PainelUsuario";

type DashboardData = {
  perfil: { full_name: string | null; institution: string | null; profile_type: string | null } | null;
  plataformas: PlataformaDoUsuario[];
};
type SessionUser = { id: string; name: string; email: string };

export default function DashboardPage() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [status, setStatus] = useState<"loading" | "signedOut" | "ready">("loading");
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    if (!firebaseAuth || !firebaseDb) {
      setError("Configure as variaveis VITE_FIREBASE_* para ativar o painel.");
      setStatus("ready");
      return;
    }
    const db = firebaseDb;
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (current) => {
      if (!alive) return;
      if (!current) { setStatus("signedOut"); setUser(null); return; }
      setStatus("ready");
      setUser({ id: current.uid, name: current.displayName || "", email: current.email || "" });
      setError("");
      try {
        const [perfil, apps, permissoes] = await Promise.all([
          getDoc(doc(db, "userProfiles", current.uid)),
          getDocs(collection(db, "apps")),
          getDocs(collection(db, "userPermissions", current.uid, "apps")),
        ]);
        const p = perfil.exists() ? perfil.data() : null;
        const acesso = new Map(permissoes.docs.map((item) => [item.id, item.data()]));
        const plataformas: PlataformaDoUsuario[] = apps.docs.map((appDoc) => {
          const app = appDoc.data();
          const permission = acesso.get(appDoc.id);
          const statusApp = app.status === "active" || app.status === "disabled" ? app.status : "development";
          const statusPermissao = permission?.status === "active" || permission?.status === "blocked" || permission?.status === "pending"
            ? permission.status as "active" | "blocked" | "pending" : null;
          return {
            id: appDoc.id,
            slug: appDoc.id,
            platform: typeof app.platform === "string" && app.platform.trim() ? app.platform : "AnalitCalc",
            category: typeof app.category === "string" ? app.category : null,
            name: typeof app.name === "string" ? app.name : appDoc.id,
            description: typeof app.description === "string" ? app.description : null,
            url: typeof app.url === "string" ? app.url : null,
            status: statusApp,
            accessMode: (app.accessMode === "public" ? "public" : "restricted") as PlataformaDoUsuario["accessMode"],
            accessRole: typeof permission?.accessRole === "string" ? permission.accessRole : null,
            permissionStatus: statusPermissao,
          };
        }).filter((a) => a.status !== "disabled")
          .sort((a, b) => Number(b.status === "active") - Number(a.status === "active") || a.name.localeCompare(b.name));
        if (alive) setData({
          perfil: p ? {
            full_name: typeof p.fullName === "string" ? p.fullName : null,
            institution: typeof p.institution === "string" ? p.institution : null,
            profile_type: typeof p.profileType === "string" ? p.profileType : null,
          } : null,
          plataformas,
        });
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : "Erro ao consultar o Firestore.");
      }
    }, () => {
      if (alive) { setError("Falha ao verificar a sessao do Firebase."); setStatus("ready"); }
    });
    return () => { alive = false; unsubscribe(); };
  }, []);

  if (status === "loading") return <main style={{padding:60,textAlign:"center"}}>Carregando sua sessão...</main>;
  if (status === "signedOut") return <Navigate to="/login" replace />;
  return <PainelUsuario
    nome={data?.perfil?.full_name || user?.name || "Usuário"}
    email={user?.email || ""}
    instituicao={data?.perfil?.institution || null}
    tipoPerfil={data?.perfil?.profile_type || null}
    plataformas={data?.plataformas || []}
    erroDados={error || undefined}
  />;
}
