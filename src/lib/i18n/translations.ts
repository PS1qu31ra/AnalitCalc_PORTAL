export type Language =
  | "pt-BR"
  | "en";


export const translations = {
  "pt-BR": {
    language: {
      portuguese: "Português",
      english: "English",
      change: "Alterar idioma",
    },

    common: {
      login: "Entrar",
      createAccount: "Criar conta",
      back: "Voltar",
      continue: "Continuar",
      available: "Disponível",
      development: "Em desenvolvimento",
      comingSoon: "Disponível em breve",
      select: "Selecione...",
      optional: "Opcional",
or: "ou",
scientificEcosystem: "Ecossistema científico",
    },

    home: {
      navPlatforms:
        "Plataformas",
    
      navEcosystem:
        "Ecossistema",
    
      navHow:
        "Como funciona",
    
      heroBadge:
        "Ciência sem fronteiras",
    
      heroTitle1:
        "Uma conta.",
    
      heroTitle2:
        "Um ecossistema inteiro",
    
      heroTitle3:
        "de ferramentas científicas.",
    
      heroDescription:
        "Acesse ferramentas para ensino, pesquisa, visualização e análise científica a partir de uma única conta.",
    
      createMyAccount:
        "Criar minha conta",
    
      alreadyAccount:
        "Já tenho uma conta",
    
      identity:
        "IDENTIDADE",
    
      platforms:
        "PLATAFORMAS",
    
      environment:
        "POSSIBILIDADES",
    
      identityDescription:
        "Um acesso para tudo.",
    
      platformsDescription:
        "Ferramentas complementares.",
    
      possibilitiesDescription:
        "Ciência sem limites.",
    
      platformEyebrow:
        "NOSSAS PLATAFORMAS",
    
      platformTitle:
        "Ferramentas poderosas. Um ecossistema conectado.",
    
      platformDescription:
        "AnalitCalc e Visualizer compartilham a mesma identidade, perfil e estrutura de acesso dentro do Analit.",
    
      accessPortal:
        "Acessar plataforma",
    
      ecosystemEyebrow:
        "ECOSSISTEMA ANALIT",
    
      ecosystemTitle:
        "Uma identidade que acompanha toda a sua experiência científica.",
    
      ecosystemDescription:
        "O Analit Portal centraliza sua conta, perfil e acesso às ferramentas científicas do ecossistema.",
    
      identityTitle:
        "Identidade centralizada",
    
      profileTitle:
        "Perfil integrado",
    
      profileDescription:
        "Seu contexto acadêmico e profissional acompanha você entre as ferramentas.",
    
      experienceTitle:
        "Experiência contínua",
    
      experienceDescription:
        "Entre em novos módulos sem precisar criar novas contas ou repetir configurações.",
    
      howEyebrow:
        "COMO FUNCIONA",
    
      howTitle:
        "Um único portal para diferentes experiências científicas.",
    
      step1:
        "Crie sua conta",
    
      step1Description:
        "Cadastre sua identidade e complete seu perfil acadêmico ou profissional.",
    
      step2:
        "Escolha uma plataforma",
    
      step2Description:
        "Acesse AnalitCalc, Visualizer e futuras ferramentas diretamente pelo portal.",
    
      step3:
        "Conte com o Analito",
    
      step3Description:
        "O assistente acompanha você dentro dos módulos e auxilia durante sua experiência.",
    
      ctaTitle:
        "Seu ecossistema científico começa aqui.",
    
      ctaDescription:
        "Uma conta para acessar ferramentas, recursos e assistência científica integrada.",
    
      footer:
        "Ensino, pesquisa e tecnologia científica em um único ecossistema.",
    
      previewTitle:
        "Seu ambiente científico",
    
      previewOverview:
        "VISÃO GERAL",
    
      previewPlatforms:
        "Suas ferramentas",
    
      previewDescription:
        "Tudo o que você utiliza no ecossistema em um único ambiente.",
    
      integrated:
        "Ecossistema integrado",
    
      assistantEyebrow:
        "ASSISTÊNCIA INTELIGENTE",
    
      assistantTitle:
        "Analito acompanha você em todo o ecossistema.",
    
      assistantDescription:
        "Analito não é uma plataforma separada. Ele funciona como o assistente científico integrado aos módulos do AnalitCalc, Visualizer e às futuras ferramentas.",
    
      assistantFeature1:
        "Entende o contexto do módulo atual",
    
      assistantFeature2:
        "Ajuda na interpretação de resultados",
    
      assistantFeature3:
        "Orienta sem interromper seu fluxo de trabalho",
    
      assistantMessage:
        "Olá! Posso ajudar a interpretar este resultado?",
    },

    login: {
      access:
        "Acesso",

      title:
        "Entre na sua conta",

      description:
        "Utilize seu e-mail e senha para acessar o Analit Portal.",

      email:
        "E-mail",

      emailPlaceholder:
        "nome@instituicao.com",

      password:
        "Senha",

      passwordPlaceholder:
        "Digite sua senha",

      forgot:
        "Esqueci minha senha",

      remember:
        "Manter minha sessão ativa",

      enter:
        "Entrar no portal",

      noAccount:
        "Ainda não possui uma conta?",

      createFree:
        "Criar conta gratuitamente",

      back:
        "Voltar ao portal",

      show:
        "Mostrar",

      hide:
        "Ocultar",

      visualTitle:
        "Seu ecossistema científico começa em uma única conta.",

      visualDescription:
        "Acesse suas plataformas, mantenha seu perfil centralizado e continue suas atividades em diferentes ferramentas do ecossistema Analit.",

      visualFooter:
        "Um único acesso para todas as plataformas do ecossistema.",

      invalidEmail:
        "Informe um endereço de e-mail válido.",

      passwordRequired:
        "Informe sua senha.",

        temporaryMessage:
        "A interface está pronta. A autenticação será ativada na integração com o Neon Auth.",
      
      securityNote:
        "Suas credenciais serão processadas pelo sistema de autenticação do Analit e não serão armazenadas manualmente pelas plataformas individuais.",
      },

    signup: {
      registration:
        "Cadastro de usuário",

      ecosystemTitle:
        "Uma conta para todo o ecossistema Analit.",

      ecosystemDescription:
        "Centralize seu acesso às plataformas científicas e mantenha sua experiência integrada entre as ferramentas.",

      account:
        "Conta",

      accountDescription:
        "Identificação e acesso",

      profile:
        "Perfil",

      profileDescription:
        "Contexto acadêmico e profissional",

      step:
        "Etapa",

      of:
        "de",

      createTitle:
        "Crie sua conta",

      createDescription:
        "Informe seus dados de identificação e defina suas credenciais de acesso.",

      completeTitle:
        "Complete seu perfil",

      completeDescription:
        "Estas informações nos ajudam a compreender o perfil de uso das plataformas e aprimorar o ecossistema Analit.",

      identification:
        "Identificação",

      accountData:
        "Dados da conta",

      fullName:
        "Nome completo",

      fullNamePlaceholder:
        "Informe seu nome completo",

      email:
        "E-mail",

      emailPlaceholder:
        "nome@instituicao.com",

      password:
        "Senha",

      passwordPlaceholder:
        "Mínimo de 8 caracteres",

      confirmPassword:
        "Confirmar senha",

      repeatPassword:
        "Repita sua senha",

      show:
        "Mostrar",

      hide:
        "Ocultar",

      nextStep:
        "Próxima etapa",

      nextDescription:
        "Em seguida, serão solicitadas informações acadêmicas ou profissionais para completar seu perfil.",

      institutional:
        "Perfil institucional",

      information:
        "Informações de formação e atuação",

      institution:
        "Instituição de vínculo",

      institutionPlaceholder:
        "Ex.: Universidade Federal de Minas Gerais",

      profileType:
        "Perfil de atuação",

      specifyProfile:
        "Especifique seu perfil",

      area:
        "Área de formação ou atuação",

      specifyArea:
        "Especifique sua área",

      primaryGoal:
        "Finalidade principal de uso",

      country:
        "País",

      state:
        "Estado",

      specifyCountry:
        "Informe o país",

      discovery:
        "Como conheceu a plataforma?",

      specify:
        "Especifique",

      preferNot:
        "Prefiro não informar",

      complete:
        "Concluir cadastro",

      validated:
        "Formulário validado",

      ready:
        "Perfil pronto para cadastro",

      readyDescription:
        "Todas as informações foram validadas corretamente. A criação definitiva da conta será ativada quando conectarmos a autenticação ao Neon.",

        review:
        "Revisar informações",
      
      dataUse:
        "As informações solicitadas serão utilizadas para personalização, análise agregada de uso e aprimoramento das plataformas.",
    },
  },


  en: {
    language: {
      portuguese: "Português",
      english: "English",
      change: "Change language",
    },

    common: {
      login: "Sign in",
      createAccount: "Create account",
      back: "Back",
      continue: "Continue",
      available: "Available",
      development: "In development",
      comingSoon: "Coming soon",
      select: "Select...",
      optional: "Optional",
or: "or",
scientificEcosystem: "Scientific ecosystem",
    },

    home: {
      navPlatforms:
        "Platforms",
    
      navEcosystem:
        "Ecosystem",
    
      navHow:
        "How it works",
    
      heroBadge:
        "Science without boundaries",
    
      heroTitle1:
        "One account.",
    
      heroTitle2:
        "An entire ecosystem",
    
      heroTitle3:
        "of scientific tools.",
    
      heroDescription:
        "Access tools for education, research, visualization and scientific analysis through a single account.",
    
      createMyAccount:
        "Create my account",
    
      alreadyAccount:
        "I already have an account",
    
      identity:
        "IDENTITY",
    
      platforms:
        "PLATFORMS",
    
      environment:
        "POSSIBILITIES",
    
      identityDescription:
        "One access for everything.",
    
      platformsDescription:
        "Complementary tools.",
    
      possibilitiesDescription:
        "Science without limits.",
    
      platformEyebrow:
        "OUR PLATFORMS",
    
      platformTitle:
        "Powerful tools. A connected ecosystem.",
    
      platformDescription:
        "AnalitCalc and Visualizer share the same identity, profile and access infrastructure within Analit.",
    
      accessPortal:
        "Access platform",
    
      ecosystemEyebrow:
        "ANALIT ECOSYSTEM",
    
      ecosystemTitle:
        "One identity throughout your scientific experience.",
    
      ecosystemDescription:
        "Analit Portal centralizes your account, profile and access to the ecosystem's scientific tools.",
    
      identityTitle:
        "Centralized identity",
    
      profileTitle:
        "Integrated profile",
    
      profileDescription:
        "Your academic and professional context follows you across tools.",
    
      experienceTitle:
        "Continuous experience",
    
      experienceDescription:
        "Enter new modules without creating additional accounts or repeating configurations.",
    
      howEyebrow:
        "HOW IT WORKS",
    
      howTitle:
        "One portal for different scientific experiences.",
    
      step1:
        "Create your account",
    
      step1Description:
        "Create your identity and complete your academic or professional profile.",
    
      step2:
        "Choose a platform",
    
      step2Description:
        "Access AnalitCalc, Visualizer and future tools directly through the portal.",
    
      step3:
        "Ask Analito",
    
      step3Description:
        "The assistant follows you inside the modules and supports you throughout your experience.",
    
      ctaTitle:
        "Your scientific ecosystem starts here.",
    
      ctaDescription:
        "One account to access scientific tools, resources and integrated assistance.",
    
      footer:
        "Education, research and scientific technology in one ecosystem.",
    
      previewTitle:
        "Your scientific environment",
    
      previewOverview:
        "OVERVIEW",
    
      previewPlatforms:
        "Your tools",
    
      previewDescription:
        "Everything you use across the ecosystem in one environment.",
    
      integrated:
        "Integrated ecosystem",
    
      assistantEyebrow:
        "INTELLIGENT ASSISTANCE",
    
      assistantTitle:
        "Analito follows you across the ecosystem.",
    
      assistantDescription:
        "Analito is not a separate platform. It works as the scientific assistant integrated into AnalitCalc, Visualizer and future tools.",
    
      assistantFeature1:
        "Understands the current module context",
    
      assistantFeature2:
        "Helps interpret scientific results",
    
      assistantFeature3:
        "Supports you without interrupting your workflow",
    
      assistantMessage:
        "Hi! Can I help you interpret this result?",
    },

    login: {
      access:
        "Access",

      title:
        "Sign in to your account",

      description:
        "Use your email and password to access Analit Portal.",

      email:
        "Email",

      emailPlaceholder:
        "name@institution.com",

      password:
        "Password",

      passwordPlaceholder:
        "Enter your password",

      forgot:
        "Forgot password?",

      remember:
        "Keep me signed in",

      enter:
        "Enter portal",

      noAccount:
        "Don't have an account yet?",

      createFree:
        "Create a free account",

      back:
        "Back to portal",

      show:
        "Show",

      hide:
        "Hide",

      visualTitle:
        "Your scientific ecosystem starts with one account.",

      visualDescription:
        "Access your platforms, keep your profile centralized and continue your activities across the Analit ecosystem.",

      visualFooter:
        "One account for every platform in the ecosystem.",

      invalidEmail:
        "Enter a valid email address.",

      passwordRequired:
        "Enter your password.",

        temporaryMessage:
        "The interface is ready. Authentication will be enabled when Neon Auth is integrated.",
      
      securityNote:
        "Your credentials will be processed by the Analit authentication system and will not be manually stored by individual platforms.",
      },

    signup: {
      registration:
        "User registration",

      ecosystemTitle:
        "One account for the entire Analit ecosystem.",

      ecosystemDescription:
        "Centralize access to scientific platforms and maintain an integrated experience across tools.",

      account:
        "Account",

      accountDescription:
        "Identity and access",

      profile:
        "Profile",

      profileDescription:
        "Academic and professional context",

      step:
        "Step",

      of:
        "of",

      createTitle:
        "Create your account",

      createDescription:
        "Enter your identification details and define your access credentials.",

      completeTitle:
        "Complete your profile",

      completeDescription:
        "This information helps us understand platform usage and improve the Analit ecosystem.",

      identification:
        "Identification",

      accountData:
        "Account details",

      fullName:
        "Full name",

      fullNamePlaceholder:
        "Enter your full name",

      email:
        "Email",

      emailPlaceholder:
        "name@institution.com",

      password:
        "Password",

      passwordPlaceholder:
        "At least 8 characters",

      confirmPassword:
        "Confirm password",

      repeatPassword:
        "Repeat your password",

      show:
        "Show",

      hide:
        "Hide",

      nextStep:
        "Next step",

      nextDescription:
        "Next, we will ask for academic or professional information to complete your profile.",

      institutional:
        "Institutional profile",

      information:
        "Education and professional information",

      institution:
        "Affiliated institution",

      institutionPlaceholder:
        "Example: Federal University of Minas Gerais",

      profileType:
        "Professional profile",

      specifyProfile:
        "Specify your profile",

      area:
        "Field of study or work",

      specifyArea:
        "Specify your field",

      primaryGoal:
        "Primary purpose of use",

      country:
        "Country",

      state:
        "State",

      specifyCountry:
        "Enter your country",

      discovery:
        "How did you hear about the platform?",

      specify:
        "Specify",

      preferNot:
        "Prefer not to say",

      complete:
        "Complete registration",

      validated:
        "Form validated",

      ready:
        "Profile ready for registration",

      readyDescription:
        "All information was successfully validated. Account creation will be enabled when authentication is connected to Neon.",

        review:
        "Review information",
      
      dataUse:
        "The requested information will be used for personalization, aggregated usage analysis and platform improvement.",
    },
  },
} as const;


export type TranslationDictionary =
  typeof translations[Language];