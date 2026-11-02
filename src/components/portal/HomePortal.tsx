import { Link } from "react-router-dom";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import ReachMap from "@/components/portal/ReachMap";
import BrandAsset from "./BrandAsset";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { HOME_COPY } from "@/lib/portal/home-copy";
import styles from "./HomePortal.module.css";

export default function HomePortal() {
  const { language, dictionary } = useLanguage();
  const t = HOME_COPY[language];
  const isPt = language === "pt-BR";

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand} aria-label="AnalitCalc — início">
            <BrandAsset
              src="/brand/analitcalc-logo.png"
              alt="AnalitCalc"
              className={styles.brandLogo}
              fallback="AnalitCalc"
              fallbackClassName={styles.brandLogoFallback}
            />
          </Link>
          <div className={styles.headerActions}>
            <LanguageSwitcher />
            <Link to="/login" className={styles.loginButton}>{dictionary.common.login}</Link>
            <Link to="/cadastro" className={styles.signupButton}>{dictionary.common.createAccount}</Link>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>
            {isPt ? "PLATAFORMA TÉCNICO-CIENTÍFICA E EDUCACIONAL" : "TECHNICAL, SCIENTIFIC AND EDUCATIONAL PLATFORM"}
          </span>
          <h1 className={styles.heroTitle}>
            {isPt ? <>Uma plataforma para <em>Química Analítica</em>.</>
              : <>One platform for <em>Analytical Chemistry</em>.</>}
          </h1>
          <p className={styles.heroDescription}>
            {isPt
              ? "O AnalitCalc integra ferramentas computacionais para apoiar ensino, pesquisa, cálculos, simulações, visualização e interpretação em Química Analítica."
              : "AnalitCalc integrates computational tools to support education, research, calculations, simulations, visualization and interpretation in Analytical Chemistry."}
          </p>
          <div className={styles.heroActions}>
            <Link to="/login?app=analitcalc" className={styles.primaryButton}>
              {isPt ? "Acessar AnalitCalc" : "Access AnalitCalc"}<span aria-hidden="true">→</span>
            </Link>
            <Link to="/cadastro" className={styles.secondaryButton}>{dictionary.common.createAccount}</Link>
          </div>

          <div className={styles.affiliationRow}>
            <BrandAsset
              src="/brand/grupo-quimica-analitica-aplicada.png"
              alt={isPt ? "Grupo de Química Analítica Aplicada" : "Applied Analytical Chemistry Group"}
              className={styles.inlineAffiliationLogo}
              fallback={isPt ? "Grupo de Química Analítica Aplicada" : "Applied Analytical Chemistry Group"}
              fallbackClassName={styles.affiliationFallback}
            />
            <BrandAsset
              src="/brand/ufmg.png"
              alt={isPt ? "Universidade Federal de Minas Gerais" : "Federal University of Minas Gerais"}
              className={`${styles.inlineAffiliationLogo} ${styles.inlineUfmgLogo}`}
              fallback="UFMG"
              fallbackClassName={`${styles.affiliationFallback} ${styles.ufmgFallback}`}
            />
          </div>

          {/* Original ZIP did not include the certificate PDF. Do not link to a non-existent file. */}
          <div className={styles.registrationCard}>
            <span className={styles.registrationLabel}>
              {isPt ? "Programa de computador registrado" : "Registered computer program"}
            </span>
            <strong className={styles.registrationNumber}>{t.registrationNumber}</strong>
          </div>
        </div>
      </section>

      <section id="alcance" className={styles.mapSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.mapIntro}>
            <span className={styles.sectionEyebrow}>{isPt ? "ALCANCE" : "REACH"}</span>
            <h2 className={styles.sectionTitle}>
              {isPt ? "Onde o AnalitCalc já chegou" : "Where AnalitCalc has already reached"}
            </h2>
            <p className={styles.sectionDescription}>
              {isPt
                ? "Mapa de alcance da plataforma com base nos registros de acesso e uso."
                : "Platform reach map based on access and usage records."}
            </p>
          </div>
          <div className={styles.mapCard}><ReachMap language={language} /></div>
        </div>
      </section>

      <section id="contato" className={styles.contactBand}>
        <div className={styles.contactInner}>
          <div className={styles.contactBlock}>
            <span className={styles.contactLabel}>{isPt ? "CONTATO INSTITUCIONAL" : "INSTITUTIONAL CONTACT"}</span>
            <strong className={styles.contactTitle}>
              {isPt
                ? "AnalitCalc · Grupo de Química Analítica Aplicada · UFMG"
                : "AnalitCalc · Applied Analytical Chemistry Group · UFMG"}
            </strong>
          </div>
          <div className={styles.contactBlock}>
            <span className={styles.contactLabel}>{isPt ? "ENDEREÇO" : "ADDRESS"}</span>
            <p className={styles.contactText}>{t.address}</p>
          </div>
        </div>
      </section>
      <footer className={styles.footer}><p>{t.footer}</p></footer>
    </main>
  );
}
