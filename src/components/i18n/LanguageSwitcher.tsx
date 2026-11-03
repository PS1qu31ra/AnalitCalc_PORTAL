

import {
  useState,
} from "react";

import {
  useLanguage,
} from "./LanguageProvider";

import styles from "./LanguageSwitcher.module.css";


export default function LanguageSwitcher() {
  const {
    language,
    setLanguage,
    dictionary,
  } = useLanguage();


  const [
    aberto,
    setAberto,
  ] = useState(false);


  return (
    <div
      className={
        styles.wrapper
      }
    >
      <button
        type="button"
        className={
          styles.trigger
        }
        aria-label={
          dictionary.language.change
        }
        onClick={() =>
          setAberto(
            (valor) =>
              !valor
          )
        }
      >
        <span>
          ◎
        </span>

        {language === "pt-BR"
          ? "PT"
          : "EN"}

        <span
          className={
            styles.chevron
          }
        >
          ▾
        </span>
      </button>


      {aberto && (
        <div
          className={
            styles.menu
          }
        >
          <button
            type="button"
            className={
              language ===
              "pt-BR"
                ? styles.active
                : ""
            }
            onClick={() => {
              setLanguage(
                "pt-BR"
              );

              setAberto(
                false
              );
            }}
          >
            <span>
              🇧🇷
            </span>

            Português
          </button>


          <button
            type="button"
            className={
              language ===
              "en"
                ? styles.active
                : ""
            }
            onClick={() => {
              setLanguage(
                "en"
              );

              setAberto(
                false
              );
            }}
          >
            <span>
              🇺🇸
            </span>

            English
          </button>
        </div>
      )}
    </div>
  );
}