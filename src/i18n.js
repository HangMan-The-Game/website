import { createI18n } from "vue-i18n";
import en from "./locales/en.json"
import it from "./locales/it.json"

function loadLocaleMessages() {
    const locales = [{ English: en }, { Italiano: it }];
    const messages = {}
    locales.forEach(lang => {
        const key = Object.keys(lang)
        messages[key] = lang[key]
    })
    return messages
}

export default createI18n({
    // legacy: false,
    locale: "English",
    globalInjection: true,
    messages: loadLocaleMessages()
})