

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth/client";
import { concluirPerfilPendente } from "@/lib/cadastro/pending";

import {
  FormEvent,
  useState,
} from "react";

import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

import styles from "./Login.module.css";


function languageError(_message: string | undefined, pt: boolean) {
  // Resposta genérica evita revelar a existência de uma conta.
  return pt ? "Não foi possível entrar. Verifique seu e-mail e senha ou confirme seu cadastro."
    : "Could not sign in. Check your email and password, or verify your account.";
}

type LoginErros = {
  email?: string;
  password?: string;
};


export default function LoginForm() {
  const {
    dictionary,
  } = useLanguage();

  const t = dictionary.login;
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);


  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    mostrarSenha,
    setMostrarSenha,
  ] = useState(false);

  const [
    erros,
    setErros,
  ] =
    useState<LoginErros>({});

  const [
    mensagem,
    setMensagem,
  ] = useState("");


  function validar() {
    const novosErros:
      LoginErros = {};


    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      )
    ) {
      novosErros.email =
        t.invalidEmail;
    }


    if (!password) {
      novosErros.password =
        t.passwordRequired;
    }


    return novosErros;
  }


  async function entrar(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const encontrados =
      validar();


    if (
      Object.keys(
        encontrados
      ).length > 0
    ) {
      setErros(encontrados);
      setMensagem("");

      return;
    }


    setErros({});
    setCarregando(true);
    setMensagem("");

    try {
      if (!authClient) {
        setMensagem("Configure VITE_FIREBASE_* no projeto para ativar o login.");
        return;
      }
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });
      if (error) {
        setMensagem(languageError(error.message, dictionary.common.login === "Entrar"));
        return;
      }
      try {
        await concluirPerfilPendente(email);
      } catch (syncError) {
        // O login foi efetuado; os dados pendentes permanecem no navegador para outra tentativa.
        console.error("Falha ao sincronizar perfil complementar:", syncError);
      }
      navigate("/painel", { replace: true });
    } catch {
      setMensagem(dictionary.common.login === "Entrar"
        ? "Não foi possível conectar ao sistema de autenticação."
        : "Could not connect to the authentication service.");
    } finally {
      setCarregando(false);
    }
  }


  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.visualPanel}>
          <Link
            to="/"
            className={styles.brand}
          >
            <div className={styles.brandMark}>
              AC
            </div>

            <div>
              <strong>
                AnalitCalc
              </strong>

              <span>
                {dictionary.common.scientificEcosystem}
              </span>
            </div>
          </Link>


          <div className={styles.visualContent}>
            <span className={styles.visualEyebrow}>
              AnalitCalc
            </span>

            <h1>
              {t.visualTitle}
            </h1>

            <p>
              {t.visualDescription}
            </p>


            <div className={styles.platformPreview}>
              <div className={styles.platformItem}>
                <div className={styles.platformIcon}>
                  TC
                </div>

                <div>
                  <strong>
                    Titulometria Clássica
                  </strong>

                  <span>
                    {dictionary.common.available}
                  </span>
                </div>

                <div className={styles.availableDot} />
              </div>


              <div className={styles.platformItem}>
                <div className={styles.platformIcon}>
                  CT
                </div>

                <div>
                  <strong>
                    Curvas de Titulação
                  </strong>

                  <span>
                    {dictionary.common.development}
                  </span>
                </div>
              </div>


              <div className={styles.platformItem}>
                <div className={styles.platformIcon}>
                  EQ
                </div>

                <div>
                  <strong>
                    Equilíbrios Químicos
                  </strong>

                  <span>
                    {dictionary.common.development}
                  </span>
                </div>
              </div>
            </div>
          </div>


          <p className={styles.visualFooter}>
            {t.visualFooter}
          </p>
        </section>


        <section className={styles.loginPanel}>
          <div className={styles.loginContainer}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 50,
              }}
            >
              <Link
                to="/"
                className={styles.backLink}
                style={{
                  marginBottom: 0,
                }}
              >
                ← {t.back}
              </Link>

              <LanguageSwitcher />
            </div>


            <div className={styles.loginHeader}>
              <span className={styles.eyebrow}>
                {t.access}
              </span>

              <h2>
                {t.title}
              </h2>

              <p>
                {t.description}
              </p>
            </div>


            <form
              className={styles.form}
              onSubmit={entrar}
            >
              <label className={styles.field}>
                <span>
                  {t.email}
                </span>

                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(
                      event.target.value
                    );

                    setErros(
                      (atual) => ({
                        ...atual,
                        email:
                          undefined,
                      })
                    );

                    setMensagem("");
                  }}
                  placeholder={
                    t.emailPlaceholder
                  }
                />

                {erros.email && (
                  <small className={styles.error}>
                    {erros.email}
                  </small>
                )}
              </label>


              <label className={styles.field}>
                <div className={styles.passwordLabel}>
                  <span>
                    {t.password}
                  </span>

                  <button
                    type="button"
                    className={styles.forgotButton}
                    disabled
                    title="Recuperação de senha será configurada no Firebase Authentication"
                  >
                    {t.forgot}
                  </button>
                </div>

                <div className={styles.passwordInput}>
                  <input
                    type={
                      mostrarSenha
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(
                        event.target.value
                      );

                      setErros(
                        (atual) => ({
                          ...atual,
                          password:
                            undefined,
                        })
                      );

                      setMensagem("");
                    }}
                    placeholder={
                      t.passwordPlaceholder
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setMostrarSenha(
                        (atual) =>
                          !atual
                      )
                    }
                  >
                    {mostrarSenha
                      ? t.hide
                      : t.show}
                  </button>
                </div>

                {erros.password && (
                  <small className={styles.error}>
                    {erros.password}
                  </small>
                )}
              </label>


              <p className={styles.sessionNote}>
                {dictionary.common.login === "Entrar"
                  ? "Sua sessão é gerenciada pelo Firebase Authentication."
                  : "Your session is managed by Firebase Authentication."}
              </p>


              {mensagem && (
                <div className={styles.infoMessage}>
                  {mensagem}
                </div>
              )}


              <button
                type="submit"
                className={styles.primaryButton}
                disabled={carregando}
              >
                {carregando ? (dictionary.common.login === "Entrar" ? "Entrando..." : "Signing in...") : t.enter}
                <span>→</span>
              </button>
            </form>


            <div className={styles.divider}>
              <span>
                {dictionary.common.or}
              </span>
            </div>


            <div className={styles.createAccount}>
              <span>
                {t.noAccount}
              </span>

              <Link to="/cadastro">
                {t.createFree}
              </Link>
            </div>


            <div className={styles.securityNote}>
              <div>
                ◇
              </div>

              <p>
                {t.securityNote}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}