import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "@/src/components/locales/en/common.json"
import ur from "@/src/components/locales/ur/common.json"
import hi from "@/src/components/locales/hi/common.json"
import ar from "@/src/components/locales/ar/common.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ur: { translation: ur },
      hi: { translation: hi },
      ar: { translation: ar }
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  })

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng)
})

export default i18n
