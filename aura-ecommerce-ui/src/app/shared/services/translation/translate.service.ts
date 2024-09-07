import { Injectable } from "@angular/core";
import { LanguageInterface, dictionary } from "src/assets/i18n/lang";

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private currentLanguage: string | null = null;

    constructor() { }

    setCurrentLanguage(language: string): void {
        this.currentLanguage = language;
        localStorage.setItem("currentLanguage", language);
    }

    getCurrentLanguage() {
        return localStorage.getItem("currentLanguage");
    }

    translate(key: string, args?: string[]): string {
        let language = localStorage.getItem("currentLanguage");
        if (language && dictionary[language]) {
            let returnValue = this.resolve(<LanguageInterface>dictionary[language], key);
            if (returnValue !== null) {
                if (args !== null && args) {
                    for (let i = 0; i < args.length; i++) {
                        const valueToReplace = '{{value'.concat((i + 1).toString(), '}}');
                        returnValue = returnValue.replace(valueToReplace, args[i]);
                    }
                }
                return returnValue;
            }
        }
        return key;
    }

    resolve(obj: LanguageInterface, path: string): string {
        return <string>path.split('.').reduce(function (prev: any, curr: string) {
            return prev ? prev[curr] : null;
        }, obj);
    }

    // Method to check if any language exists
    anyLanguageExists(): boolean {
        return Object.keys(dictionary).length > 0;
    }
}

