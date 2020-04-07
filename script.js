import { KEY_MAP } from './scripts/data.js';
import Renderer from './scripts/renderer.js';
import LangSessionStorage from './scripts/langSessionStorage.js';
import { addEventListenersForVirtualKeyboard, addEventListenersForPhysicalKeyboard } from './scripts/eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
  const langStorage = new LangSessionStorage();
  const renderer = new Renderer(KEY_MAP, langStorage);
  const textArea = Renderer.renderTextArea();
  const keyboard = renderer.createKeyboard();

  addEventListenersForVirtualKeyboard(keyboard, textArea, KEY_MAP, langStorage);
  addEventListenersForPhysicalKeyboard(keyboard, textArea, langStorage);
});
