import { Injectable } from '@angular/core';
declare function getTranslate(text: string): string;
declare function getCurrentLang(): string;
declare function getAllTranslates(): [string, any];

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  getTranslate(text: string) {
    return getTranslate(text);
  }
  getCurrentLang() {
    return getCurrentLang();
  }
  getAllTranslates() {
    return Object.entries(getAllTranslates());
  }
  getAllLanguages() {
    return Object.keys(getAllTranslates());
  }
  getTranslateLanguage(text:string, language:string){
    return getAllTranslates()[language as any][text]
  }
}
