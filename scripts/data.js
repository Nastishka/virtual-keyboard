 export class KeyOption {
  constructor(code, innerText,
    additionalCssClasses) {
    this.code = code;
    this.innerText = innerText;
    if(additionalCssClasses) {
      this.additionalCssClasses = additionalCssClasses;
    }
  }

  getInnerText(locale) {
    if (typeof(this.innerText) === 'string' ){
      return this.innerText;
    } else {
      return this.innerText[locale];
    }
  }

  getMainText(locale) {
    let result = this.getInnerText(locale);
    if (Array.isArray(result)) {
        return result[0];
    }
    return result;
  }

  getAdditionalText(locale) {
    let result = this.getInnerText(locale);
    if (Array.isArray(result)) {
        return result[1];
    }
    return null;
  }
}

export const KEY_MAP = [
  [
    new KeyOption('Backquote', {'EN': ['`', '~'], 'RU': 'Ё'}),
    new KeyOption('Digit1', {'EN': ['1', '!'], 'RU': ['1', '!']}),
    new KeyOption('Digit2', {'EN': ['2', '@'], 'RU': ['2', '"']}),
    new KeyOption('Digit3', {'EN': ['3', '#'], 'RU': ['3', '№']}),
    new KeyOption('Digit4', {'EN': ['4', '$'], 'RU': ['4', ';']}),
    new KeyOption('Digit5', {'EN': ['5', '%'], 'RU': ['5', '%']}),
    new KeyOption('Digit6', {'EN': ['6', '^'], 'RU': ['6', ':']}),
    new KeyOption('Digit7', {'EN': ['7', '&'], 'RU': ['7', '?']}),
    new KeyOption('Digit8', {'EN': ['8', '*'], 'RU': ['8', '*']}),
    new KeyOption('Digit9', {'EN': ['9', '('], 'RU': ['9', '(']}),
    new KeyOption('Digit0', {'EN': ['0', ')'], 'RU': ['0', ')']}),
    new KeyOption('Minus', {'EN': ['-', '_'], 'RU': ['-', '_']}),
    new KeyOption('Equal', {'EN': ['=', '+'], 'RU': ['=', '+']}),
    new KeyOption('Backspace', 'Backspace', ['backspace']),
],
  [
    new KeyOption('Tab', 'Tab', ['tab']),
    new KeyOption('KeyQ', {'EN': 'Q', 'RU': 'Й'}),
    new KeyOption('KeyW', {'EN': 'W', 'RU': 'Ц'}),
    new KeyOption('KeyE', {'EN': 'E', 'RU': 'У'}),
    new KeyOption('KeyR', {'EN': 'R', 'RU': 'К'}),
    new KeyOption('KeyT', {'EN': 'T', 'RU': 'Е'}),
    new KeyOption('KeyY', {'EN': 'Y', 'RU': 'Н'}),
    new KeyOption('KeyU', {'EN': 'U', 'RU': 'Г'}),
    new KeyOption('KeyI', {'EN': 'I', 'RU': 'Ш'}),
    new KeyOption('KeyO', {'EN': 'O', 'RU': 'Щ'}),
    new KeyOption('KeyP', {'EN': 'P', 'RU': 'Щ'}),
    new KeyOption('BracketLeft', {'EN': ['[', '{'], 'RU': 'Х'}),
    new KeyOption('BracketRight', {'EN': [']', '}'], 'RU': 'Ъ'}),
    new KeyOption('Backslash', {'EN': ['\\', '|'], 'RU': ['\\', '/']}),
    new KeyOption('Delete', 'DEL', ['del']),
  ],
  [
    new KeyOption('CapsLock', 'Caps Lock', ['capslock']),
    new KeyOption('KeyA', {'EN': 'A', 'RU': 'Ф'}),
    new KeyOption('KeyS', {'EN': 'S', 'RU': 'Ы'}),
    new KeyOption('KeyD', {'EN': 'D', 'RU': 'В'}),
    new KeyOption('KeyF', {'EN': 'F', 'RU': 'А'}),
    new KeyOption('KeyG', {'EN': 'G', 'RU': 'П'}),
    new KeyOption('KeyH', {'EN': 'H', 'RU': 'Р'}),
    new KeyOption('KeyJ', {'EN': 'J', 'RU': 'О'}),
    new KeyOption('KeyK', {'EN': 'K', 'RU': 'Л'}),
    new KeyOption('KeyL', {'EN': 'L', 'RU': 'Д'}),
    new KeyOption('Semicolon', {'EN': [';', ':'], 'RU': 'Ж'}),
    new KeyOption('Quote', {'EN': ['\'', '"'], 'RU': 'Э'}),
    new KeyOption('Enter', 'Enter', ['enter']),
  ],
  [
    new KeyOption('ShiftLeft', 'Shift', ['shift']),
    new KeyOption('KeyZ', {'EN': 'Z', 'RU': 'Я'}),
    new KeyOption('KeyX', {'EN': 'X', 'RU': 'Ч'}),
    new KeyOption('KeyC', {'EN': 'C', 'RU': 'С'}),
    new KeyOption('KeyV', {'EN': 'V', 'RU': 'М'}),
    new KeyOption('KeyB', {'EN': 'B', 'RU': 'И'}),
    new KeyOption('KeyN', {'EN': 'N', 'RU': 'Т'}),
    new KeyOption('KeyM', {'EN': 'M', 'RU': 'Ь'}),
    new KeyOption('Comma', {'EN': [',', '<'], 'RU': 'Б'}),
    new KeyOption('Period', {'EN': ['.', '>'], 'RU': 'Ю'}),
    new KeyOption('Slash', {'EN': ['/', '?'], 'RU': ['.', ',']}),
    new KeyOption('ArrowUp', '\u2191', ['arrow']),
    new KeyOption('ShiftRight', 'Shift', ['shift']),
  ],
  [
    new KeyOption('ControlLeft', 'Ctrl', ['control']),
    new KeyOption('AltLeft', 'ALT', ['alt']),
    new KeyOption('Space', ' ', ['space']),
    new KeyOption('AltRight', 'ALT', ['alt']),
    new KeyOption('ControlRight', 'Ctrl', ['control']),
    new KeyOption('ArrowLeft', '\u2190', ['arrow']),
    new KeyOption('ArrowDown', '\u2193', ['arrow']),
    new KeyOption('ArrowRight', '\u2192', ['arrow']),
    new KeyOption('Lang', {'EN': 'EN', 'RU': 'RU'}, ['lang']),
  ]
];
