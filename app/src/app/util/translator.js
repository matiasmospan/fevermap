import polyglot from 'node-polyglot';

/* Split each translation into a separate file for easier source code management */
import translation_en from 'assets/language/en';
import translation_fi from 'assets/language/fi';
import translation_sv from 'assets/language/sv';
import translation_it from 'assets/language/it';
import translation_de from 'assets/language/de';
import translation_cn from 'assets/language/cn';
import translation_es from 'assets/language/es';
import translation_fr from 'assets/language/fr';
import translation_ru from 'assets/language/ru';
import translation_uk from 'assets/language/uk';
import translation_be from 'assets/language/be';
import translation_ar from 'assets/language/ar';
import translation_pl from 'assets/language/pl';
import translation_ga from 'assets/language/ga';

const translations = {
    en: translation_en,
    fi: translation_fi,
    sv: translation_sv,
    it: translation_it,
    de: translation_de,
    cn: translation_cn,
    es: translation_es,
    fr: translation_fr,
    ru: translation_ru,
    uk: translation_uk,
    be: translation_be,
    ar: translation_ar,
    pl: translation_pl,
    ga: translation_ga,
};

export default class Translator {
    static getLang() {
        return { key: Translator.lang, name: Translator.get('lang_name') };
    }

    static getPossibleLanguages() {
        return Object.keys(translations).map(langKey => ({ key: langKey, name: translations[langKey].lang_name }));
    }

    static setLang(lang) {
        Translator.lang = lang ? lang.toLowerCase() : 'en';
        Translator._loadPhrases();
        document.querySelector('html').setAttribute('lang', lang ? lang.toLowerCase() : 'en');
    }

    static _loadPhrases() {
        Translator.polyglot = new polyglot({ phrases: translations });
    }

    static get(word, params) {
        if (!Translator.polyglot) {
            Translator.setLang('en');
        }
        return Translator.polyglot.t(`${this.lang}.${word}`, params);
    }
}
