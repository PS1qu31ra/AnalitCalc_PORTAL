import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authClient, authenticatedFetch } from "../lib/auth/client";
import type { PlataformaDoUsuario } from "../lib/portal/access";
import { PainelUsuario } from "../components/painel/PainelUsuario";

type DashboardData = {
  perfil: { full_name: string | null; institution: string | null; profile_type: string | null } | null;
  plataformas: PlataformaDoUsuario[];
};

type SessionUser = { id: string; name: string; email: string };

export default function DashboardPage() {
  const [user,setUser] = useState<SessionUser | null>(null);
  const [status,setStatus] = useState<'loading'|'signedOut'|'ready'>('loading');
  const [data,setData] = useState<DashboardData | null>(null);
  const [error,setError] = useState<string>('');
  useEffect(()=>{
    let alive=true;
    async function load(){
      if(!authClient){if(alive){setError('Configure VITE_NEON_AUTH_URL para usar o painel.');setStatus('ready')}return}
      try{
        const session=await authClient.getSession();
        if(!alive)return;
        if(!session.data?.user){setStatus('signedOut');return}
        const current=session.data.user as SessionUser;
        setUser(current);
        setStatus('ready');
        try{
          const response=await authenticatedFetch('/api/me');
          if(!response.ok)throw new Error(response.status===503?'Configure PORTAL_DATABASE_URL, NEON_AUTH_BASE_URL e NEON_AUTH_JWKS_URL na Vercel.':response.status===401?'Sessão expirada. Entre novamente.':'Falha ao carregar as permissões.');
          const json=(await response.json()) as DashboardData;
          if(alive)setData(json);
        }catch(e){if(alive)setError((e as Error).message+(import.meta.env.DEV?' No preview Vite do StackBlitz, a API protegida precisa ser executada na Vercel.':''))}
      }catch{if(alive)setStatus('signedOut')}
    }
    void load();return()=>{alive=false};
  },[]);
  if(status==='loading')return <main style={{padding:60,textAlign:'center'}}>Carregando sua sessão...</main>;
  if(status==='signedOut')return <Navigate to='/login' replace/>;
  return <PainelUsuario nome={data?.perfil?.full_name || user?.name || 'Usuário'} email={user?.email || ''} instituicao={data?.perfil?.institution || null} tipoPerfil={data?.perfil?.profile_type || null} plataformas={data?.plataformas || []} erroDados={error || undefined}/>;
}
