export type PerfilAtuacao =
  | "student"
  | "faculty"
  | "researcher"
  | "lab_technician"
  | "lab_professional"
  | "industry_professional"
  | "other";


export type CadastroDados = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;

  institution: string;

  profileType: PerfilAtuacao | "";
  profileTypeOther: string;

  areaCode: string;
  areaOther: string;

  academicLevel: string;
  professionalExperienceRange: string;

  primaryGoal: string;

  countryCode: string;
  countryOther: string;

  stateCode: string;

  discoverySource: string;
  discoverySourceOther: string;
};


export type CadastroErros =
  Partial<
    Record<
      keyof CadastroDados | "form",
      string
    >
  >;