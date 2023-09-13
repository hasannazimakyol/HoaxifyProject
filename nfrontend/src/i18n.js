import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import tr from 'javascript-time-ago/locale/tr'

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
        Users: "Users",
        Next: '>',
        Previous: '<',
        LoadFailure: 'Load Failure',
        UserNotFound: 'User not found',
        Edit: 'Edit',
        ChangeDisplayName: 'Change display name',
        Save: 'Save',
        Cancel: 'Cancel',
        MyProfile: 'My Profile',
        Hoaxify: 'Hoaxify',
        ThereAreNoHoaxes: 'There are no hoaxes',
        LoadOldHoaxes: 'Load old hoaxes',
        ThereAreNewHoaxes: 'There are new haoxes',
        DeleteHoax: 'Delete Hoax',
        AreYouSureToDeleteHoax: 'Are you sure to delete hoax?',
        DeleteMyAccount: 'Delete My Account',
        AreYouSureToDeleteProfile: 'Are you sure to delete your profile?'
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
        Users: "Kullanıcılar",
        Next: '>',
        Previous: '<',
        LoadFailure: 'Liste alınamadı',
        UserNotFound: 'Kullanıcı bulunamadı',
        Edit: 'Düzenle',
        ChangeDisplayName: 'Görünür isminizi değiştirin',
        Save: 'Kaydet',
        Cancel: 'İptal',
        MyProfile: 'Hesabım',
        Hoaxify: 'Hoaxify',
        ThereAreNoHoaxes: 'Hoax bulunamadı',
        LoadOldHoaxes: 'Geçmiş Hoaxları getir',
        ThereAreNewHoaxes: 'Yeni hoaxlar var',
        DeleteHoax: "Hoax'u Sil",
        AreYouSureToDeleteHoax: "Hoax'u silmek istediğinize emin misiniz?",
        DeleteMyAccount: 'Hesabımı Sil',
        AreYouSureToDeleteProfile: 'Profilinizi silmek istediğinize emin misiniz?'
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

TimeAgo.addLocale(en);
TimeAgo.addLocale(tr);

export default i18n;
