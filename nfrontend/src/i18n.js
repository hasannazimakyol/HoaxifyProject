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
<<<<<<< HEAD
        Users: "Users"
=======
        Users: "Users",
        Next: '>',
        Previous: '<',
        LoadFailure: 'Load Failure',
        UserNotFound: 'User not found',
        Edit: 'Edit',
        ChangeDisplayName: 'Change display name',
        Save: 'Save',
        Cancel: 'Cancel'
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
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
<<<<<<< HEAD
        Users: "Kullanıcılar"
=======
        Users: "Kullanıcılar",
        Next: '>',
        Previous: '<',
        LoadFailure: 'Liste alınamadı',
        UserNotFound: 'Kullanıcı bulunamadı',
        Edit: 'Düzenle',
        ChangeDisplayName: 'Görünür isminizi değiştirin',
        Save: 'Kaydet',
        Cancel: 'İptal'
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
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
