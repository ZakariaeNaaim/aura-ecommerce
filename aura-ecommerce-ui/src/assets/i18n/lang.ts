import { deLanguage } from "./de"
import { enLanguage } from "./en"
import { frLanguage } from "./fr"

export interface LanguageInterface {
    [index:string] : string | LanguageInterface
}

export const dictionary : LanguageInterface = {
    ['fr']:frLanguage,
    ['en']:enLanguage,
    ['de']:deLanguage
}