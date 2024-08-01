const namespace = {
  buttons: {
    signIn: "Авторизоваться",
  },
  links: {
    signUp: "Зарегистрироваться",
  },
  label: {
    login: "Логин",
    password: "Пароль",
  },
} as const;

export const ru = {
  translation: {
    ...namespace,
  },
} as const;
