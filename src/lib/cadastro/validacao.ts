import type {
  Language,
} from "@/lib/i18n/translations";

import type {
  CadastroDados,
  CadastroErros,
} from "./tipos";

import {
  usaExperienciaProfissional,
  usaNivelAcademico,
} from "./opcoes";


const mensagens = {
  "pt-BR": {
    fullName:
      "Informe seu nome completo.",

    email:
      "Informe um endereço de e-mail válido.",

    password:
      "A senha deve possuir pelo menos 8 caracteres.",

    confirmPassword:
      "As senhas não coincidem.",

    institution:
      "Informe sua instituição de vínculo.",

    profileType:
      "Selecione seu perfil de atuação.",

    profileTypeOther:
      "Informe seu perfil de atuação.",

    areaCode:
      "Selecione sua área de formação ou atuação.",

    areaOther:
      "Informe sua área.",

    academicLevel:
      "Selecione a opção correspondente.",

    professionalExperienceRange:
      "Selecione sua experiência profissional.",

    primaryGoal:
      "Selecione a finalidade principal de uso.",

    countryCode:
      "Selecione seu país.",

    stateCode:
      "Selecione seu estado.",

    countryOther:
      "Informe seu país.",

    discoverySourceOther:
      "Informe como conheceu a plataforma.",
  },

  en: {
    fullName:
      "Enter your full name.",

    email:
      "Enter a valid email address.",

    password:
      "Your password must contain at least 8 characters.",

    confirmPassword:
      "The passwords do not match.",

    institution:
      "Enter your affiliated institution.",

    profileType:
      "Select your professional profile.",

    profileTypeOther:
      "Describe your professional profile.",

    areaCode:
      "Select your field of study or work.",

    areaOther:
      "Enter your field of study or work.",

    academicLevel:
      "Select the corresponding option.",

    professionalExperienceRange:
      "Select your professional experience.",

    primaryGoal:
      "Select your primary purpose of use.",

    countryCode:
      "Select your country.",

    stateCode:
      "Select your state.",

    countryOther:
      "Enter your country.",

    discoverySourceOther:
      "Tell us how you heard about the platform.",
  },
} as const;


export function validarConta(
  dados: CadastroDados,
  language: Language
): CadastroErros {
  const erros:
    CadastroErros = {};

  const m =
    mensagens[language];


  if (
    dados.fullName
      .trim()
      .length < 3
  ) {
    erros.fullName =
      m.fullName;
  }


  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      dados.email.trim()
    )
  ) {
    erros.email =
      m.email;
  }


  if (
    dados.password.length < 8
  ) {
    erros.password =
      m.password;
  }


  if (
    dados.password !==
    dados.confirmPassword
  ) {
    erros.confirmPassword =
      m.confirmPassword;
  }


  return erros;
}


export function validarPerfil(
  dados: CadastroDados,
  language: Language
): CadastroErros {
  const erros:
    CadastroErros = {};

  const m =
    mensagens[language];


  if (
    !dados.institution.trim()
  ) {
    erros.institution =
      m.institution;
  }


  if (
    !dados.profileType
  ) {
    erros.profileType =
      m.profileType;
  }


  if (
    dados.profileType ===
      "other" &&
    !dados.profileTypeOther.trim()
  ) {
    erros.profileTypeOther =
      m.profileTypeOther;
  }


  if (
    !dados.areaCode
  ) {
    erros.areaCode =
      m.areaCode;
  }


  if (
    dados.areaCode ===
      "other" &&
    !dados.areaOther.trim()
  ) {
    erros.areaOther =
      m.areaOther;
  }


  if (
    usaNivelAcademico(
      dados.profileType
    ) &&
    !dados.academicLevel
  ) {
    erros.academicLevel =
      m.academicLevel;
  }


  if (
    usaExperienciaProfissional(
      dados.profileType
    ) &&
    !dados
      .professionalExperienceRange
  ) {
    erros.professionalExperienceRange =
      m.professionalExperienceRange;
  }


  if (
    !dados.primaryGoal
  ) {
    erros.primaryGoal =
      m.primaryGoal;
  }


  if (
    !dados.countryCode
  ) {
    erros.countryCode =
      m.countryCode;
  }


  if (
    dados.countryCode ===
      "BR" &&
    !dados.stateCode
  ) {
    erros.stateCode =
      m.stateCode;
  }


  if (
    dados.countryCode ===
      "ZZ" &&
    !dados.countryOther.trim()
  ) {
    erros.countryOther =
      m.countryOther;
  }


  if (
    dados.discoverySource ===
      "other" &&
    !dados
      .discoverySourceOther
      .trim()
  ) {
    erros.discoverySourceOther =
      m.discoverySourceOther;
  }


  return erros;
}