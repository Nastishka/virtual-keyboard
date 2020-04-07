import { KeyOption, KEY_MAP } from './scripts/data.js';
import {Renderer} from './scripts/renderer.js';
import {LangSessionStorage} from './scripts/langSessionStorage.js';
import {addEventListenersForVirtualKeyboard, addEventListenersForPhysicalKeyboard} from './scripts/eventHandlers.js';

document.addEventListener("DOMContentLoaded", (e) => {
  let langStorage = new LangSessionStorage();
  let renderer = new Renderer(KEY_MAP, langStorage);
  let textArea = renderer.renderTextArea();
  let keyboard = renderer.createKeyboard();

  addEventListenersForVirtualKeyboard(keyboard, textArea, KEY_MAP, langStorage);
  addEventListenersForPhysicalKeyboard(keyboard, textArea, langStorage);
});
