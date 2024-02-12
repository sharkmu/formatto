import de from "./locale/de.json";
import en from "./locale/en.json";
import hu from "./locale/hu.json";
import ko from "./locale/ko.json";

const detectedLanguage = window.localStorage.getItem("language");

export const LOCALE_CATEGORY = {
    COMMANDS: "commands",
    NOTICE_MESSAGES: "noticeMessages",
    SETTING_SECTIONS: "settingSections",
    HEADING_GAPS: "headingGaps",
    OTHER_GAPS: "otherGaps",
    FORMAT_OPTIONS: "formatOptions",
    OTHER_OPTIONS: "otherOptions",
} as const;

type ObjectValues<T> = T[keyof T];
type LocaleCategory = ObjectValues<typeof LOCALE_CATEGORY>;

const locales: { [key: string]: typeof en } = {
    de: de,
    en: en,
    hu: hu,
    ko: ko,
};

/** @example getLocale(LOCALE_CATEGORY.COMMANDS, "Format Document") */
export const getLocale = (category: LocaleCategory, key: string) => {
    const usingLocale = locales[detectedLanguage] ?? locales.en;
    const message = usingLocale[category][key];

    if (message === "") {
        const usingLocale = locales[detectedLanguage] ?? locales.en;
        return usingLocale[category][key];
    }

    return usingLocale[category][key];
};
