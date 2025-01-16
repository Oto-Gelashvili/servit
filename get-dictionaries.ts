export interface Dictionary {
  home: {
    title: string;
    desc: string;
    omw: string;
    btn: string;
  };
  about: {
    title: string;
    desc: string;
  };
  order: {
    title: string;
  };
  footer: {
    aboutLink: string;
    contactLink: string;
    policies: string;
    rights: string;
    profile: string;
  };
  header: {
    aboutLink: string;
    tasks: string;
    services: string;
    home: string;
    pricing: string;
    logout: string;
    products: string;
    profile: string;
    createProduct: string;
    orders: string;
  };
  sorter: {
    options: string;
    prhigh: string;
    prlow: string;
    trhigh: string;
    trlow: string;
  };
  servicesPage: {
    notFound: string;
  };
  serviceID: {
    contacts: string;
    msg: string;
  };
  services: {
    span: string;
    nospan: string;
  };
  products: {
    products: string;
    noProducts: string;
  };
  productsID: {
    stock: string;
    order: string;
    cart: string;
    buy: string;
    dimensions: string;
    width: string;
    height: string;
    depth: string;
    delete: string;
  };
  language: {
    lang: string;
  };
  profile: {
    title: string;
    name: string;
    mail: string;
  };
  sub: {
    title: string;
    subtitle: string;
    frequencies: {
      monthly: string;
      annually: string;
    };
    priceSuffix: {
      monthly: string;
      annually: string;
    };
    tiers: {
      junior: {
        name: string;
        description: string;
        features: string[];
        cta: string;
      };
      middle: {
        name: string;
        description: string;
        features: string[];
        cta: string;
      };
      senior: {
        name: string;
        description: string;
        features: string[];
        cta: string;
      };
    };
  };
  payment: {
    success: string;
  };
  addPage: {
    title: string;
    name: string;
    price: string;
    category: string;
    tags: string;
    brand: string;
    imageURL: string;
    width: string;
    height: string;
    depth: string;
    weight: string;
    description: string;
    submit: string;
  };
  auth: {
    header: string;
    headerRegister: string;
    headerForgot: string;
    forgot: string;
    recover: string;
    sending: string;
    email: string;
    password: string;
    loading: string;
    loadingRegister: string;
    loadingGithub: string;
    github: string;
    login: string;
    signUp: string;
    requiredFields: string;
    shortPassword: string;
    invalidCredentials: string;
    emailNotConfirmed: string;
    userNotFound: string;
    tooManyRequests: string;
    defaultError: string;
    duplicate: string;
    defaultErrorRegister: string;
    invalidEmail: string;
    emailRateLimit: string;
    signupDisabled: string;
    weakPassword: string;
    sentCode: string;
    emailReq: string;
    verificationError: string;
    checkMailForReset: string;
    reset: string;
    confirmPass: string;
    newPass: string;
    passReq: string;
    passNotEqual: string;
    passResetFail: string;
    passResetSuccess: string;
  };
  protected: {
    loggedIn: string;
  };
}

// Enumerate supported locales
export type Locale = 'en' | 'ka';

// Define the dictionaries object
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ka: () => import('./dictionaries/ka.json').then((module) => module.default),
};

// Define the getDictionary function
export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
