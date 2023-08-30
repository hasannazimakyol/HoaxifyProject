import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        SignUp: "Sign Up",
        PasswordMismatch: "Password mismatch",
        Username: "Username",
        DisplayName: "Display Name",
        Password: "Password",
        PasswordRepeat: "Password Repeat",
        Agree: "Agree",
        Login: "Login",
        Logout: "Logout",
        Users: "Users"
      },
    },
    tr: {
      translations: {
        SignUp: "Kayıt Ol",
        PasswordMismatch: "Aynı parolayı giriniz",
        Username: "Kullanıcı Adı",
        DisplayName: "Görünen İsim",
        Password: "Şifre",
        PasswordRepeat: "Şifreyi Tekrarla",
        Agree: "Kabul Et",
        Login: "Giriş Yap",
        Logout: "Çık",
        Users: "Kullanıcılar"
      },
    },
  },
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
