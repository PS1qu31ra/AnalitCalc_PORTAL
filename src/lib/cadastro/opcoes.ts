import type {
  Language,
} from "@/lib/i18n/translations";

import type {
  PerfilAtuacao,
} from "./tipos";


export type OpcaoCadastro = {
  value: string;

  label: Record<
    Language,
    string
  >;
};


export const PERFIS_ATUACAO:
  OpcaoCadastro[] = [
  {
    value: "student",
    label: {
      "pt-BR": "Estudante",
      en: "Student",
    },
  },
  {
    value: "faculty",
    label: {
      "pt-BR": "Docente",
      en: "Faculty member",
    },
  },
  {
    value: "researcher",
    label: {
      "pt-BR": "Pesquisador(a)",
      en: "Researcher",
    },
  },
  {
    value: "lab_technician",
    label: {
      "pt-BR": "Técnico(a) de laboratório",
      en: "Laboratory technician",
    },
  },
  {
    value: "lab_professional",
    label: {
      "pt-BR": "Profissional de laboratório",
      en: "Laboratory professional",
    },
  },
  {
    value: "industry_professional",
    label: {
      "pt-BR": "Profissional da indústria",
      en: "Industry professional",
    },
  },
  {
    value: "other",
    label: {
      "pt-BR": "Outro",
      en: "Other",
    },
  },
];


export const AREAS:
  OpcaoCadastro[] = [
  {
    value: "pharmacy",
    label: {
      "pt-BR": "Farmácia",
      en: "Pharmacy",
    },
  },
  {
    value: "chemistry",
    label: {
      "pt-BR": "Química",
      en: "Chemistry",
    },
  },
  {
    value: "industrial_chemistry",
    label: {
      "pt-BR": "Química Industrial",
      en: "Industrial Chemistry",
    },
  },
  {
    value: "chemical_engineering",
    label: {
      "pt-BR": "Engenharia Química",
      en: "Chemical Engineering",
    },
  },
  {
    value: "biomedicine",
    label: {
      "pt-BR": "Biomedicina",
      en: "Biomedicine",
    },
  },
  {
    value: "biotechnology",
    label: {
      "pt-BR": "Biotecnologia",
      en: "Biotechnology",
    },
  },
  {
    value: "biological_sciences",
    label: {
      "pt-BR": "Ciências Biológicas",
      en: "Biological Sciences",
    },
  },
  {
    value: "veterinary_medicine",
    label: {
      "pt-BR": "Medicina Veterinária",
      en: "Veterinary Medicine",
    },
  },
  {
    value: "agronomy",
    label: {
      "pt-BR": "Agronomia",
      en: "Agronomy",
    },
  },
  {
    value: "environmental_engineering",
    label: {
      "pt-BR": "Engenharia Ambiental",
      en: "Environmental Engineering",
    },
  },
  {
    value: "food_science",
    label: {
      "pt-BR": "Ciência e Tecnologia de Alimentos",
      en: "Food Science and Technology",
    },
  },
  {
    value: "other",
    label: {
      "pt-BR": "Outra",
      en: "Other",
    },
  },
];


export const NIVEIS_ESTUDANTE:
  OpcaoCadastro[] = [
  {
    value: "technical",
    label: {
      "pt-BR": "Ensino técnico",
      en: "Technical education",
    },
  },
  {
    value: "undergraduate",
    label: {
      "pt-BR": "Graduação",
      en: "Undergraduate",
    },
  },
  {
    value: "specialization",
    label: {
      "pt-BR": "Especialização",
      en: "Specialization",
    },
  },
  {
    value: "masters",
    label: {
      "pt-BR": "Mestrado",
      en: "Master's degree",
    },
  },
  {
    value: "doctorate",
    label: {
      "pt-BR": "Doutorado",
      en: "Doctorate",
    },
  },
];


export const TITULACOES_ACADEMICAS:
  OpcaoCadastro[] = [
  {
    value: "undergraduate",
    label: {
      "pt-BR": "Graduação",
      en: "Undergraduate degree",
    },
  },
  {
    value: "specialization",
    label: {
      "pt-BR": "Especialização",
      en: "Specialization",
    },
  },
  {
    value: "masters",
    label: {
      "pt-BR": "Mestrado",
      en: "Master's degree",
    },
  },
  {
    value: "doctorate",
    label: {
      "pt-BR": "Doutorado",
      en: "Doctorate",
    },
  },
  {
    value: "postdoctorate",
    label: {
      "pt-BR": "Pós-doutorado",
      en: "Postdoctoral training",
    },
  },
];


export const EXPERIENCIA_PROFISSIONAL:
  OpcaoCadastro[] = [
  {
    value: "less_than_1",
    label: {
      "pt-BR": "Menos de 1 ano",
      en: "Less than 1 year",
    },
  },
  {
    value: "1_to_3",
    label: {
      "pt-BR": "1 a 3 anos",
      en: "1 to 3 years",
    },
  },
  {
    value: "4_to_7",
    label: {
      "pt-BR": "4 a 7 anos",
      en: "4 to 7 years",
    },
  },
  {
    value: "8_to_15",
    label: {
      "pt-BR": "8 a 15 anos",
      en: "8 to 15 years",
    },
  },
  {
    value: "more_than_15",
    label: {
      "pt-BR": "Mais de 15 anos",
      en: "More than 15 years",
    },
  },
];


export const FINALIDADES:
  OpcaoCadastro[] = [
  {
    value: "learning",
    label: {
      "pt-BR": "Estudo e aprendizagem",
      en: "Study and learning",
    },
  },
  {
    value: "teaching",
    label: {
      "pt-BR": "Atividades de ensino",
      en: "Teaching activities",
    },
  },
  {
    value: "laboratory",
    label: {
      "pt-BR": "Atividades laboratoriais",
      en: "Laboratory activities",
    },
  },
  {
    value: "scientific_research",
    label: {
      "pt-BR": "Pesquisa científica",
      en: "Scientific research",
    },
  },
  {
    value: "result_interpretation",
    label: {
      "pt-BR": "Análise e interpretação de resultados",
      en: "Analysis and interpretation of results",
    },
  },
  {
    value: "professional_application",
    label: {
      "pt-BR": "Aplicação profissional",
      en: "Professional application",
    },
  },
  {
    value: "exploration",
    label: {
      "pt-BR": "Exploração das ferramentas",
      en: "Platform exploration",
    },
  },
  {
    value: "other",
    label: {
      "pt-BR": "Outra",
      en: "Other",
    },
  },
];


export const ORIGENS:
  OpcaoCadastro[] = [
  {
    value: "professor",
    label: {
      "pt-BR": "Professor(a) ou docente",
      en: "Professor or faculty member",
    },
  },
  {
    value: "colleague",
    label: {
      "pt-BR": "Colega",
      en: "Colleague",
    },
  },
  {
    value: "institution",
    label: {
      "pt-BR": "Instituição de ensino",
      en: "Educational institution",
    },
  },
  {
    value: "scientific_event",
    label: {
      "pt-BR": "Congresso ou evento científico",
      en: "Scientific conference or event",
    },
  },
  {
    value: "instagram",
    label: {
      "pt-BR": "Instagram",
      en: "Instagram",
    },
  },
  {
    value: "search_engine",
    label: {
      "pt-BR": "Google ou outro mecanismo de busca",
      en: "Google or another search engine",
    },
  },
  {
    value: "scientific_publication",
    label: {
      "pt-BR": "Artigo, trabalho ou publicação científica",
      en: "Article, paper or scientific publication",
    },
  },
  {
    value: "institutional_site",
    label: {
      "pt-BR": "Site institucional",
      en: "Institutional website",
    },
  },
  {
    value: "other",
    label: {
      "pt-BR": "Outro",
      en: "Other",
    },
  },
];


export const PAISES:
  OpcaoCadastro[] = [
  {
    value: "BR",
    label: {
      "pt-BR": "Brasil",
      en: "Brazil",
    },
  },
  {
    value: "AR",
    label: {
      "pt-BR": "Argentina",
      en: "Argentina",
    },
  },
  {
    value: "CL",
    label: {
      "pt-BR": "Chile",
      en: "Chile",
    },
  },
  {
    value: "CO",
    label: {
      "pt-BR": "Colômbia",
      en: "Colombia",
    },
  },
  {
    value: "US",
    label: {
      "pt-BR": "Estados Unidos",
      en: "United States",
    },
  },
  {
    value: "ES",
    label: {
      "pt-BR": "Espanha",
      en: "Spain",
    },
  },
  {
    value: "MX",
    label: {
      "pt-BR": "México",
      en: "Mexico",
    },
  },
  {
    value: "PT",
    label: {
      "pt-BR": "Portugal",
      en: "Portugal",
    },
  },
  {
    value: "ZZ",
    label: {
      "pt-BR": "Outro país",
      en: "Other country",
    },
  },
];


export const ESTADOS_BRASIL:
  OpcaoCadastro[] = [
  { value: "AC", label: { "pt-BR": "Acre", en: "Acre" } },
  { value: "AL", label: { "pt-BR": "Alagoas", en: "Alagoas" } },
  { value: "AP", label: { "pt-BR": "Amapá", en: "Amapá" } },
  { value: "AM", label: { "pt-BR": "Amazonas", en: "Amazonas" } },
  { value: "BA", label: { "pt-BR": "Bahia", en: "Bahia" } },
  { value: "CE", label: { "pt-BR": "Ceará", en: "Ceará" } },
  { value: "DF", label: { "pt-BR": "Distrito Federal", en: "Federal District" } },
  { value: "ES", label: { "pt-BR": "Espírito Santo", en: "Espírito Santo" } },
  { value: "GO", label: { "pt-BR": "Goiás", en: "Goiás" } },
  { value: "MA", label: { "pt-BR": "Maranhão", en: "Maranhão" } },
  { value: "MT", label: { "pt-BR": "Mato Grosso", en: "Mato Grosso" } },
  { value: "MS", label: { "pt-BR": "Mato Grosso do Sul", en: "Mato Grosso do Sul" } },
  { value: "MG", label: { "pt-BR": "Minas Gerais", en: "Minas Gerais" } },
  { value: "PA", label: { "pt-BR": "Pará", en: "Pará" } },
  { value: "PB", label: { "pt-BR": "Paraíba", en: "Paraíba" } },
  { value: "PR", label: { "pt-BR": "Paraná", en: "Paraná" } },
  { value: "PE", label: { "pt-BR": "Pernambuco", en: "Pernambuco" } },
  { value: "PI", label: { "pt-BR": "Piauí", en: "Piauí" } },
  { value: "RJ", label: { "pt-BR": "Rio de Janeiro", en: "Rio de Janeiro" } },
  { value: "RN", label: { "pt-BR": "Rio Grande do Norte", en: "Rio Grande do Norte" } },
  { value: "RS", label: { "pt-BR": "Rio Grande do Sul", en: "Rio Grande do Sul" } },
  { value: "RO", label: { "pt-BR": "Rondônia", en: "Rondônia" } },
  { value: "RR", label: { "pt-BR": "Roraima", en: "Roraima" } },
  { value: "SC", label: { "pt-BR": "Santa Catarina", en: "Santa Catarina" } },
  { value: "SP", label: { "pt-BR": "São Paulo", en: "São Paulo" } },
  { value: "SE", label: { "pt-BR": "Sergipe", en: "Sergipe" } },
  { value: "TO", label: { "pt-BR": "Tocantins", en: "Tocantins" } },
];


export function usaNivelAcademico(
  perfil: PerfilAtuacao | ""
) {
  return (
    perfil === "student" ||
    perfil === "faculty" ||
    perfil === "researcher"
  );
}


export function usaExperienciaProfissional(
  perfil: PerfilAtuacao | ""
) {
  return (
    perfil === "lab_technician" ||
    perfil === "lab_professional" ||
    perfil === "industry_professional"
  );
}


export function rotuloTrajetoria(
  perfil: PerfilAtuacao | "",
  language: Language
) {
  if (perfil === "student") {
    return language === "pt-BR"
      ? "Nível de formação"
      : "Education level";
  }

  if (
    perfil === "faculty" ||
    perfil === "researcher"
  ) {
    return language === "pt-BR"
      ? "Titulação acadêmica"
      : "Academic qualification";
  }

  if (
    usaExperienciaProfissional(
      perfil
    )
  ) {
    return language === "pt-BR"
      ? "Experiência profissional"
      : "Professional experience";
  }

  return null;
}


export function opcoesTrajetoria(
  perfil: PerfilAtuacao | ""
) {
  if (perfil === "student") {
    return NIVEIS_ESTUDANTE;
  }

  if (
    perfil === "faculty" ||
    perfil === "researcher"
  ) {
    return TITULACOES_ACADEMICAS;
  }

  if (
    usaExperienciaProfissional(
      perfil
    )
  ) {
    return EXPERIENCIA_PROFISSIONAL;
  }

  return [];
}