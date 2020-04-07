export class LangSessionStorage {
  constructor() {
    this.onLangChangeCallback = null;
    this.languages = ['EN', 'RU'];
  }
  setLang(newLang) {
    sessionStorage.setItem('vkb_lang', newLang);
    if (this.onLangChangeCallback) {
      this.onLangChangeCallback(newLang);
    }
  }
  getLang() {
    return sessionStorage.getItem('vkb_lang') || this.languages[0];
  }
  toggleLang(){
    let currentLang = this.getLang();
    let newLangIndex = (this.languages.indexOf(currentLang) + 1) % this.languages.length;
    this.setLang(this.languages[newLangIndex]);
  }
  setChangeLangCallback(callback){
    this.onLangChangeCallback = callback;
  }
}
