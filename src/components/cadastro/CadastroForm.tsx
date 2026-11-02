

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authClient } from "@/lib/auth/client";
import { guardarPerfilPendente, concluirPerfilPendente } from "@/lib/cadastro/pending";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

import {
  AREAS,
  ESTADOS_BRASIL,
  FINALIDADES,
  ORIGENS,
  PAISES,
  PERFIS_ATUACAO,
  opcoesTrajetoria,
  rotuloTrajetoria,
  usaExperienciaProfissional,
} from "@/lib/cadastro/opcoes";

import {
  validarConta,
  validarPerfil,
} from "@/lib/cadastro/validacao";

import type {
  CadastroDados,
  CadastroErros,
  PerfilAtuacao,
} from "@/lib/cadastro/tipos";

import styles from "./Cadastro.module.css";


const DADOS_INICIAIS: CadastroDados = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",

  institution: "",

  profileType: "",
  profileTypeOther: "",

  areaCode: "",
  areaOther: "",

  academicLevel: "",
  professionalExperienceRange: "",

  primaryGoal: "",

  countryCode: "BR",
  countryOther: "",

  stateCode: "",

  discoverySource: "",
  discoverySourceOther: "",
};


export default function CadastroForm() {
  const {
    language,
    dictionary,
  } = useLanguage();

  const t = dictionary.signup;
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);
  const [erroServidor, setErroServidor] = useState("");
  const [precisaConfirmar, setPrecisaConfirmar] = useState(false);


  const [
    etapa,
    setEtapa,
  ] =
    useState<1 | 2>(1);

  const [
    dados,
    setDados,
  ] =
    useState<CadastroDados>(
      DADOS_INICIAIS
    );

  const [
    erros,
    setErros,
  ] =
    useState<CadastroErros>({});

  const [
    concluido,
    setConcluido,
  ] =
    useState(false);

  const [
    mostrarSenha,
    setMostrarSenha,
  ] =
    useState(false);

  const [
    mostrarConfirmacao,
    setMostrarConfirmacao,
  ] =
    useState(false);


  const rotuloNivel =
    useMemo(
      () =>
        rotuloTrajetoria(
          dados.profileType,
          language
        ),
      [
        dados.profileType,
        language,
      ]
    );


  const opcoesNivel =
    useMemo(
      () =>
        opcoesTrajetoria(
          dados.profileType
        ),
      [
        dados.profileType,
      ]
    );


  function atualizar<
    K extends keyof CadastroDados
  >(
    campo: K,
    valor: CadastroDados[K]
  ) {
    setDados((atual) => ({
      ...atual,
      [campo]: valor,
    }));

    setErros((atual) => ({
      ...atual,
      [campo]: undefined,
    }));
  }


  function alterarPerfil(
    perfil: PerfilAtuacao | ""
  ) {
    setDados((atual) => ({
      ...atual,

      profileType:
        perfil,

      profileTypeOther:
        "",

      academicLevel:
        "",

      professionalExperienceRange:
        "",
    }));

    setErros({});
  }


  function avancar() {
    const encontrados =
      validarConta(
        dados,
        language
      );

    if (
      Object.keys(
        encontrados
      ).length > 0
    ) {
      setErros(
        encontrados
      );

      return;
    }

    setErros({});
    setEtapa(2);
  }


  async function finalizar(
    event:
      FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const conta =
      validarConta(
        dados,
        language
      );

    const perfil =
      validarPerfil(
        dados,
        language
      );

    const encontrados = {
      ...conta,
      ...perfil,
    };


    if (
      Object.keys(
        encontrados
      ).length > 0
    ) {
      setErros(
        encontrados
      );

      return;
    }

    setErroServidor("");
    setEnviando(true);

    try {
      // Só o Neon Auth processa e armazena as credenciais.
      if (!authClient) {
        setErroServidor("Configure VITE_NEON_AUTH_URL antes de criar contas.");
        return;
      }
      const { error } = await authClient.signUp.email({
        name: dados.fullName.trim(),
        email: dados.email.trim().toLowerCase(),
        password: dados.password,
      });
      if (error) {
        setErroServidor(language === "pt-BR"
          ? "Não foi possível criar a conta. Confirme os dados ou tente outro e-mail."
          : "Could not create the account. Check your information or try another email.");
        return;
      }

      guardarPerfilPendente(dados);
      let possuiSessao = false;
      try {
        const resposta = await authClient.getSession();
        possuiSessao = resposta.data?.user?.email?.toLowerCase() === dados.email.trim().toLowerCase();
      } catch { /* Neon pode exigir verificação de e-mail. */ }

      if (possuiSessao) {
        try {
          await concluirPerfilPendente(dados.email);
          navigate("/painel", { replace: true });
          return;
        } catch {
          // Os dados complementares continuam pendentes até o próximo login.
        }
      }
      setPrecisaConfirmar(true);
      setConcluido(true);
    } catch {
      setErroServidor(language === "pt-BR"
        ? "Não foi possível conectar à autenticação. Tente novamente."
        : "Could not connect to the authentication service. Please retry.");
    } finally {
      setEnviando(false);
    }
  }


  if (concluido) {
    return (
      <main className={styles.page}>
        <section
          className={
            styles.successCard
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <LanguageSwitcher />
          </div>

          <div
            className={
              styles.successIcon
            }
          >
            ✓
          </div>

          <span
            className={
              styles.eyebrow
            }
          >
            {t.validated}
          </span>

          <h1>
            {t.ready}
          </h1>

          <p>
            {precisaConfirmar
              ? (language === "pt-BR"
                  ? "Conta criada. Verifique seu e-mail, caso a confirmação esteja habilitada no Neon, e entre no portal para concluir seu perfil."
                  : "Account created. Verify your email if required by Neon, then sign in to complete your profile.")
              : t.readyDescription}
          </p>

          <Link to="/login" className={styles.primaryButton}>
            {language === "pt-BR" ? "Ir para o login" : "Go to sign in"}
          </Link>
        </section>
      </main>
    );
  }


  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside
          className={
            styles.sidebar
          }
        >
          <div>
            <div
              className={
                styles.brand
              }
            >
              <div
                className={
                  styles.brandMark
                }
              >
                A
              </div>

              <div>
                <strong>
                  Analit
                </strong>

                <span>
                  {
                    dictionary
                      .common
                      .scientificEcosystem
                  }
                </span>
              </div>
            </div>


            <div
              className={
                styles.sidebarContent
              }
            >
              <span
                className={
                  styles.sidebarEyebrow
                }
              >
                {t.registration}
              </span>

              <h1>
                {t.ecosystemTitle}
              </h1>

              <p>
                {t.ecosystemDescription}
              </p>
            </div>


            <div
              className={
                styles.steps
              }
            >
              <div
                className={`${styles.step} ${
                  etapa === 1
                    ? styles.stepActive
                    : styles.stepDone
                }`}
              >
                <span>
                  {etapa === 1
                    ? "1"
                    : "✓"}
                </span>

                <div>
                  <strong>
                    {t.account}
                  </strong>

                  <small>
                    {
                      t.accountDescription
                    }
                  </small>
                </div>
              </div>


              <div
                className={`${styles.step} ${
                  etapa === 2
                    ? styles.stepActive
                    : ""
                }`}
              >
                <span>
                  2
                </span>

                <div>
                  <strong>
                    {t.profile}
                  </strong>

                  <small>
                    {
                      t.profileDescription
                    }
                  </small>
                </div>
              </div>
            </div>
          </div>


          <p
            className={
              styles.sidebarFooter
            }
          >
            {t.dataUse}
          </p>
        </aside>


        <section
          className={
            styles.formCard
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "flex-end",
              marginBottom: 22,
            }}
          >
            <LanguageSwitcher />
          </div>


          <header
            className={
              styles.formHeader
            }
          >
            <span
              className={
                styles.eyebrow
              }
            >
              {t.step} {etapa}{" "}
              {t.of} 2
            </span>

            <h2>
              {etapa === 1
                ? t.createTitle
                : t.completeTitle}
            </h2>

            <p>
              {etapa === 1
                ? t.createDescription
                : t.completeDescription}
            </p>


            <div
              className={
                styles.progress
              }
            >
              <span
                style={{
                  width:
                    etapa === 1
                      ? "50%"
                      : "100%",
                }}
              />
            </div>
          </header>


          {etapa === 1 ? (
            <div
              className={
                styles.formBody
              }
            >
              <div
                className={
                  styles.sectionTitle
                }
              >
                <span>
                  {
                    t.identification
                  }
                </span>

                <h3>
                  {t.accountData}
                </h3>
              </div>


              <div
                className={
                  styles.grid
                }
              >
                <label
                  className={
                    styles.fieldFull
                  }
                >
                  <span>
                    {t.fullName}
                  </span>

                  <input
                    value={
                      dados.fullName
                    }
                    onChange={(event) =>
                      atualizar(
                        "fullName",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.fullNamePlaceholder
                    }
                  />

                  {erros.fullName && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {erros.fullName}
                    </small>
                  )}
                </label>


                <label
                  className={
                    styles.fieldFull
                  }
                >
                  <span>
                    {t.email}
                  </span>

                  <input
                    type="email"
                    value={
                      dados.email
                    }
                    onChange={(event) =>
                      atualizar(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.emailPlaceholder
                    }
                  />

                  {erros.email && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {erros.email}
                    </small>
                  )}
                </label>


                <label>
                  <span>
                    {t.password}
                  </span>

                  <div
                    className={
                      styles.passwordField
                    }
                  >
                    <input
                      type={
                        mostrarSenha
                          ? "text"
                          : "password"
                      }
                      value={
                        dados.password
                      }
                      onChange={(event) =>
                        atualizar(
                          "password",
                          event.target.value
                        )
                      }
                      placeholder={
                        t.passwordPlaceholder
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarSenha(
                          (valor) =>
                            !valor
                        )
                      }
                    >
                      {mostrarSenha
                        ? t.hide
                        : t.show}
                    </button>
                  </div>

                  {erros.password && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {erros.password}
                    </small>
                  )}
                </label>


                <label>
                  <span>
                    {
                      t.confirmPassword
                    }
                  </span>

                  <div
                    className={
                      styles.passwordField
                    }
                  >
                    <input
                      type={
                        mostrarConfirmacao
                          ? "text"
                          : "password"
                      }
                      value={
                        dados.confirmPassword
                      }
                      onChange={(event) =>
                        atualizar(
                          "confirmPassword",
                          event.target.value
                        )
                      }
                      placeholder={
                        t.repeatPassword
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarConfirmacao(
                          (valor) =>
                            !valor
                        )
                      }
                    >
                      {mostrarConfirmacao
                        ? t.hide
                        : t.show}
                    </button>
                  </div>

                  {erros.confirmPassword && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        erros.confirmPassword
                      }
                    </small>
                  )}
                </label>
              </div>


              <div
                className={
                  styles.infoBox
                }
              >
                <strong>
                  {t.nextStep}
                </strong>

                <p>
                  {t.nextDescription}
                </p>
              </div>


              <footer
                className={
                  styles.actionsEnd
                }
              >
                <button
                  type="button"
                  className={
                    styles.primaryButton
                  }
                  onClick={
                    avancar
                  }
                >
                  {
                    dictionary
                      .common
                      .continue
                  }{" "}
                  →
                </button>
              </footer>
            </div>
          ) : (
            <form
              onSubmit={
                finalizar
              }
              className={
                styles.formBody
              }
            >
              <div
                className={
                  styles.sectionTitle
                }
              >
                <span>
                  {
                    t.institutional
                  }
                </span>

                <h3>
                  {t.information}
                </h3>
              </div>


              <div
                className={
                  styles.grid
                }
              >
                <label
                  className={
                    styles.fieldFull
                  }
                >
                  <span>
                    {
                      t.institution
                    }
                  </span>

                  <input
                    value={
                      dados.institution
                    }
                    onChange={(event) =>
                      atualizar(
                        "institution",
                        event.target.value
                      )
                    }
                    placeholder={
                      t.institutionPlaceholder
                    }
                  />

                  {erros.institution && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        erros.institution
                      }
                    </small>
                  )}
                </label>


                <label>
                  <span>
                    {
                      t.profileType
                    }
                  </span>

                  <select
                    value={
                      dados.profileType
                    }
                    onChange={(event) =>
                      alterarPerfil(
                        event.target
                          .value as
                          PerfilAtuacao | ""
                      )
                    }
                  >
                    <option value="">
                      {
                        dictionary
                          .common
                          .select
                      }
                    </option>

                    {PERFIS_ATUACAO.map(
                      (opcao) => (
                        <option
                          key={
                            opcao.value
                          }
                          value={
                            opcao.value
                          }
                        >
                          {
                            opcao.label[
                              language
                            ]
                          }
                        </option>
                      )
                    )}
                  </select>

                  {erros.profileType && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        erros.profileType
                      }
                    </small>
                  )}
                </label>


                <label>
                  <span>
                    {t.area}
                  </span>

                  <select
                    value={
                      dados.areaCode
                    }
                    onChange={(event) =>
                      atualizar(
                        "areaCode",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      {
                        dictionary
                          .common
                          .select
                      }
                    </option>

                    {AREAS.map(
                      (opcao) => (
                        <option
                          key={
                            opcao.value
                          }
                          value={
                            opcao.value
                          }
                        >
                          {
                            opcao.label[
                              language
                            ]
                          }
                        </option>
                      )
                    )}
                  </select>

                  {erros.areaCode && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {erros.areaCode}
                    </small>
                  )}
                </label>


                {dados.profileType ===
                  "other" && (
                  <label>
                    <span>
                      {
                        t.specifyProfile
                      }
                    </span>

                    <input
                      value={
                        dados
                          .profileTypeOther
                      }
                      onChange={(event) =>
                        atualizar(
                          "profileTypeOther",
                          event.target.value
                        )
                      }
                    />

                    {erros.profileTypeOther && (
                      <small
                        className={
                          styles.error
                        }
                      >
                        {
                          erros.profileTypeOther
                        }
                      </small>
                    )}
                  </label>
                )}


                {dados.areaCode ===
                  "other" && (
                  <label>
                    <span>
                      {
                        t.specifyArea
                      }
                    </span>

                    <input
                      value={
                        dados.areaOther
                      }
                      onChange={(event) =>
                        atualizar(
                          "areaOther",
                          event.target.value
                        )
                      }
                    />

                    {erros.areaOther && (
                      <small
                        className={
                          styles.error
                        }
                      >
                        {
                          erros.areaOther
                        }
                      </small>
                    )}
                  </label>
                )}


                {rotuloNivel && (
                  <label>
                    <span>
                      {rotuloNivel}
                    </span>

                    <select
                      value={
                        usaExperienciaProfissional(
                          dados.profileType
                        )
                          ? dados
                              .professionalExperienceRange
                          : dados
                              .academicLevel
                      }
                      onChange={(event) => {
                        if (
                          usaExperienciaProfissional(
                            dados.profileType
                          )
                        ) {
                          atualizar(
                            "professionalExperienceRange",
                            event.target.value
                          );
                        } else {
                          atualizar(
                            "academicLevel",
                            event.target.value
                          );
                        }
                      }}
                    >
                      <option value="">
                        {
                          dictionary
                            .common
                            .select
                        }
                      </option>

                      {opcoesNivel.map(
                        (opcao) => (
                          <option
                            key={
                              opcao.value
                            }
                            value={
                              opcao.value
                            }
                          >
                            {
                              opcao.label[
                                language
                              ]
                            }
                          </option>
                        )
                      )}
                    </select>

                    {(erros.academicLevel ||
                      erros.professionalExperienceRange) && (
                      <small
                        className={
                          styles.error
                        }
                      >
                        {
                          erros.academicLevel ||
                          erros
                            .professionalExperienceRange
                        }
                      </small>
                    )}
                  </label>
                )}


                <label>
                  <span>
                    {
                      t.primaryGoal
                    }
                  </span>

                  <select
                    value={
                      dados.primaryGoal
                    }
                    onChange={(event) =>
                      atualizar(
                        "primaryGoal",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      {
                        dictionary
                          .common
                          .select
                      }
                    </option>

                    {FINALIDADES.map(
                      (opcao) => (
                        <option
                          key={
                            opcao.value
                          }
                          value={
                            opcao.value
                          }
                        >
                          {
                            opcao.label[
                              language
                            ]
                          }
                        </option>
                      )
                    )}
                  </select>

                  {erros.primaryGoal && (
                    <small
                      className={
                        styles.error
                      }
                    >
                      {
                        erros.primaryGoal
                      }
                    </small>
                  )}
                </label>


                <label>
                  <span>
                    {t.country}
                  </span>

                  <select
                    value={
                      dados.countryCode
                    }
                    onChange={(event) => {
                      atualizar(
                        "countryCode",
                        event.target.value
                      );

                      atualizar(
                        "stateCode",
                        ""
                      );

                      atualizar(
                        "countryOther",
                        ""
                      );
                    }}
                  >
                    {PAISES.map(
                      (opcao) => (
                        <option
                          key={
                            opcao.value
                          }
                          value={
                            opcao.value
                          }
                        >
                          {
                            opcao.label[
                              language
                            ]
                          }
                        </option>
                      )
                    )}
                  </select>
                </label>


                {dados.countryCode ===
                  "BR" && (
                  <label>
                    <span>
                      {t.state}
                    </span>

                    <select
                      value={
                        dados.stateCode
                      }
                      onChange={(event) =>
                        atualizar(
                          "stateCode",
                          event.target.value
                        )
                      }
                    >
                      <option value="">
                        {
                          dictionary
                            .common
                            .select
                        }
                      </option>

                      {ESTADOS_BRASIL.map(
                        (opcao) => (
                          <option
                            key={
                              opcao.value
                            }
                            value={
                              opcao.value
                            }
                          >
                            {
                              opcao.label[
                                language
                              ]
                            }
                          </option>
                        )
                      )}
                    </select>

                    {erros.stateCode && (
                      <small
                        className={
                          styles.error
                        }
                      >
                        {
                          erros.stateCode
                        }
                      </small>
                    )}
                  </label>
                )}


                {dados.countryCode ===
                  "ZZ" && (
                  <label>
                    <span>
                      {
                        t.specifyCountry
                      }
                    </span>

                    <input
                      value={
                        dados.countryOther
                      }
                      onChange={(event) =>
                        atualizar(
                          "countryOther",
                          event.target.value
                        )
                      }
                    />

                    {erros.countryOther && (
                      <small
                        className={
                          styles.error
                        }
                      >
                        {
                          erros.countryOther
                        }
                      </small>
                    )}
                  </label>
                )}


                <label
                  className={
                    styles.fieldFull
                  }
                >
                  <span>
                    {t.discovery}

                    <small>
                      {
                        dictionary
                          .common
                          .optional
                      }
                    </small>
                  </span>

                  <select
                    value={
                      dados.discoverySource
                    }
                    onChange={(event) =>
                      atualizar(
                        "discoverySource",
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      {
                        t.preferNot
                      }
                    </option>

                    {ORIGENS.map(
                      (opcao) => (
                        <option
                          key={
                            opcao.value
                          }
                          value={
                            opcao.value
                          }
                        >
                          {
                            opcao.label[
                              language
                            ]
                          }
                        </option>
                      )
                    )}
                  </select>
                </label>


                {dados.discoverySource ===
                  "other" && (
                  <label
                    className={
                      styles.fieldFull
                    }
                  >
                    <span>
                      {t.specify}
                    </span>

                    <input
                      value={
                        dados
                          .discoverySourceOther
                      }
                      onChange={(event) =>
                        atualizar(
                          "discoverySourceOther",
                          event.target.value
                        )
                      }
                    />

                    {erros.discoverySourceOther && (
                      <small
                        className={
                          styles.error
                        }
                      >
                        {
                          erros.discoverySourceOther
                        }
                      </small>
                    )}
                  </label>
                )}
              </div>


              {erroServidor && <div role="alert" style={{color: "#991b1b", background: "#fff3f3", borderRadius: 10, padding: 12, fontSize: 12}}>{erroServidor}</div>}

              <footer
                className={
                  styles.actions
                }
              >
                <button
                  type="button"
                  className={
                    styles.secondaryButton
                  }
                  onClick={() =>
                    setEtapa(1)
                  }
                >
                  ←{" "}
                  {
                    dictionary
                      .common
                      .back
                  }
                </button>

                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={enviando}
                >
                  {enviando ? (language === "pt-BR" ? "Criando conta..." : "Creating account...") : t.complete}
                </button>
              </footer>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}