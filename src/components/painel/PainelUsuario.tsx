

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { authClient } from "@/lib/auth/client";
import { temAcesso, urlSegura, type PlataformaDoUsuario } from "@/lib/portal/access";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import styles from "./PainelUsuario.module.css";

type Props = {
  nome: string;
  email: string;
  instituicao: string | null;
  tipoPerfil: string | null;
  plataformas: PlataformaDoUsuario[];
  erroDados?: string;
};


export function PainelUsuario({ nome, email, instituicao, tipoPerfil, plataformas, erroDados }: Props) {
  const { language } = useLanguage();
  const en = language === "en";
  const navigate = useNavigate();
  const [saindo, setSaindo] = useState(false);
  const [erroSaida, setErroSaida] = useState("");
  const autorizadas = plataformas.filter(temAcesso);
  const indisponiveis = plataformas.filter((app) => !temAcesso(app));
  const primeiroNome = nome.trim().split(/\s+/)[0] || nome;
  const iniciais = nome.trim().split(/\s+/).slice(0, 2).map((palavra) => palavra[0]?.toUpperCase()).join("");

  async function sair() {
    setSaindo(true);
    setErroSaida("");
    try {
      if (!authClient) throw new Error("Auth não configurado");
      const { error } = await authClient.signOut();
      if (error) throw new Error(error.message);
      navigate("/login", { replace: true });
    } catch {
      setErroSaida(en ? "Could not sign out. Please retry." : "Não foi possível encerrar a sessão. Tente novamente.");
      setSaindo(false);
    }
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.brand} aria-label="Página inicial AnalitCalc">
          <span className={styles.brandMark}>AC</span>
          <span><strong>AnalitCalc</strong><small>{en ? "Scientific tools" : "Ferramentas científicas"}</small></span>
        </Link>
        <div className={styles.navTitle}>{en ? "WORKSPACE" : "AMBIENTE"}</div>
        <nav className={styles.nav} aria-label={en ? "Main navigation" : "Navegação principal"}>
          <span className={styles.navActive}><span>◫</span>{en ? "Overview" : "Visão geral"}</span>
          <a href="#plataformas"><span>▦</span>{en ? "My tools" : "Minhas ferramentas"}</a>
          <a href="#perfil"><span>◉</span>{en ? "My profile" : "Meu perfil"}</a>
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarHint}>{en ? "One account, all your scientific tools." : "Uma conta para suas ferramentas científicas."}</div>
          <button type="button" className={styles.sideLogout} disabled={saindo} onClick={sair}>
            ↪ {saindo ? (en ? "Signing out..." : "Saindo...") : (en ? "Sign out" : "Sair da conta")}
          </button>
        </div>
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}>AnalitCalc <span>/</span> {en ? "Workspace" : "Meu ambiente"}</div>
          <div className={styles.topActions}><LanguageSwitcher /><button type="button" className={styles.topLogout} onClick={sair} disabled={saindo}>{en ? "Sign out" : "Sair"}</button><span className={styles.avatarSmall}>{iniciais || "A"}</span></div>
        </header>
        <div className={styles.content}>
          <section className={styles.hero}>
            <div>
              <div className={styles.kicker}>{en ? "YOUR SCIENTIFIC SPACE" : "SEU ESPAÇO CIENTÍFICO"}</div>
              <h1>{en ? `Welcome, ${primeiroNome}.` : `Olá, ${primeiroNome}.`}</h1>
              <p>{en ? "Independent scientific tools, permissions and your profile in one place." : "Ferramentas científicas independentes, acessos e seu perfil em um só lugar."}</p>
            </div>
            <div className={styles.heroLogo}>A<span>ANALITCALC</span></div>
          </section>

          {erroDados && <div className={styles.alert} role="alert">{erroDados}</div>}
          {erroSaida && <div className={styles.alert} role="alert">{erroSaida}</div>}

          <div className={styles.stats}>
            <div className={styles.stat}><span>{en ? "Available access" : "Acessos liberados"}</span><strong>{erroDados ? "—" : autorizadas.length}</strong><small>{en ? "Active permissions" : "Permissões ativas"}</small></div>
            <div className={styles.stat}><span>{en ? "Tools in catalog" : "Ferramentas no catálogo"}</span><strong>{erroDados ? "—" : plataformas.length}</strong><small>{en ? "Registered tools" : "Ferramentas cadastradas"}</small></div>
            <div className={styles.stat}><span>{en ? "My account" : "Minha conta"}</span><strong className={styles.statWord}>{en ? "Active" : "Ativa"}</strong><small>{email}</small></div>
          </div>

          <section id="plataformas" className={styles.section}>
            <div className={styles.sectionHeading}><div><span>{en ? "ANALITCALC" : "ANALITCALC"}</span><h2>{en ? "My tools" : "Minhas ferramentas"}</h2><p>{en ? "Each tool opens in its own environment, according to your permissions." : "Cada ferramenta abre em seu próprio ambiente, conforme suas permissões."}</p></div></div>
            {!erroDados && autorizadas.length === 0 && (
              <div className={styles.empty}>{en ? "No tool is enabled for your account yet." : "Nenhuma ferramenta está liberada para sua conta. Os acessos são administrados no AnalitCalc."}</div>
            )}
            <div className={styles.cards}>
              {autorizadas.map((app) => {
                const href = urlSegura(app.url);
                return (
                  <article key={app.id} className={styles.platformCard}>
                    <div className={styles.platformTop}><span className={styles.platformIcon}>{app.name.slice(0, 2).toUpperCase()}</span><span className={styles.enabled}>● {en ? "Enabled" : "Liberado"}</span></div>
                    <span className={styles.category}>{[app.platform, app.category].filter(Boolean).join(" · ")}</span>
                    <h3>{app.name}</h3>
                    <p>{app.description ?? (en ? "Independent scientific tool in AnalitCalc." : "Ferramenta científica independente do AnalitCalc.")}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.accessButton}>{en ? "Open tool" : "Abrir ferramenta"} <span>↗</span></a>
                    ) : (
                      <div className={styles.linkMissing}>{en ? "Access enabled · Link pending" : "Acesso liberado · Link em configuração"}</div>
                    )}
                  </article>
                );
              })}
            </div>
            {indisponiveis.length > 0 && !erroDados && (
              <>
                <h3 className={styles.subheading}>{en ? "Other tools" : "Outras ferramentas"}</h3>
                <div className={styles.otherList}>
                  {indisponiveis.map((app) => (
                    <div className={styles.otherApp} key={app.id}>
                      <span className={styles.otherIcon}>{app.name.slice(0, 2).toUpperCase()}</span>
                      <span className={styles.otherName}><strong>{app.name}</strong><small>{[app.platform, app.category].filter(Boolean).join(" · ")}</small></span>
                      <span className={styles.otherStatus}>{app.status === "development" ? (en ? "In development" : "Em desenvolvimento") : app.permissionStatus === "blocked" ? (en ? "Blocked" : "Bloqueado") : app.permissionStatus === "pending" ? (en ? "Pending" : "Pendente") : (en ? "Not authorized" : "Sem permissão")}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          <section className={styles.section} id="perfil">
            <div className={styles.sectionHeading}><div><span>{en ? "YOUR IDENTITY" : "SUA IDENTIDADE"}</span><h2>{en ? "Account overview" : "Resumo da conta"}</h2></div></div>
            <div className={styles.profile}>
              <span className={styles.profileAvatar}>{iniciais || "A"}</span>
              <div><strong>{nome}</strong><span>{email}</span><small>{[instituicao, tipoPerfil].filter(Boolean).join(" · ") || (en ? "Complete your profile during registration." : "Dados complementares não informados.")}</small></div>
            </div>
          </section>
          <footer className={styles.footer}>AnalitCalc · {en ? "Independent scientific tools" : "Ferramentas científicas independentes"}</footer>
        </div>
      </section>
    </main>
  );
}
