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

  footer: {
    tasks: string;
    contactUs: string;
    services: string;
    create: string;
    bookmarks: string;
    MessageReq: string;
    placeholderMsg: string;
    sending: string;
    successMsg: string;
    failMsg: string;
    errorMsg: string;
    logInMsg: string;
    profile: string;
    send: string;
    home: string;
    pricing: string;
    products: string;
    copy: string;
    rights: string;
    login: string;
    signUp: string;
    register: string;
    MessageMinLength: string;
  };
  header: {
    tasks: string;
    services: string;
    home: string;
    pricing: string;
    logout: string;
    products: string;
    profile: string;
    createService: string;
    orders: string;
    bookmarks: string;
    theme: string;
    createTasks: string;
  };
  sorter: {
    options: string;
    prhigh: string;
    prlow: string;
    trhigh: string;
    trlow: string;
  };

  services: {
    heading2: string;
    headingTasks: string;
    notFoundTasks: string;
    contacts: string;
    msg: string;
    notFound: string;
    next: string;
    prev: string;
    metaTitle: string;
    metaDescription: string;
    selectCategory: string;
    delete: string;
    confirm: string;
    cancel: string;
    noReturn: string;
    confirm_delete_title: string;
    delete_error: string;
    addBookmark: string;
    removeBookmark: string;
    bookmark_error: string;
    edit: string;
    price: string;
    desc: string;
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
      basic: {
        name: string;
        description: string;
        features: string[];
        cta: string;
        unsubscribe: string;
      };
      premium: {
        name: string;
        description: string;
        features: string[];
        cta: string;
        unsubscribe: string;
      };
    };
  };
  payment: {
    success: string;
    failure: String;
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
  addService: {
    heading: string;
    updateHeading: string;
    title: string;
    title_in: string;
    price: string;
    category: string;
    image: string;
    description: string;
    description_in: string;
    submit: string;
    selectCategory: string;
    inOther: string;
    descOther: string;
    optional: string;
    loading: string;
    titleReq: string;
    descriptionReq: string;
    priceReq: string;
    categoryReq: string;

    globalError: string;
  };
  bookmarks: {
    heading: string;
  };
  tasks: {
    add: {
      heading: string;
      updateHeading: string;
      title: string;
      title_in: string;
      category: string;
      description: string;
      description_in: string;
      submit: string;
      selectCategory: string;
      inOther: string;
      descOther: string;
      optional: string;
      loading: string;
      titleReq: string;
      descriptionReq: string;
      categoryReq: string;
      globalError: string;
    };
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
