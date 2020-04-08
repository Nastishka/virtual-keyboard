export default class Renderer {
  constructor(keyMap, langStorage) {
    this.keyMap = keyMap;
    this.langStorage = langStorage;
    this.langStorage.setChangeLangCallback(this.renderKeyBoard.bind(this));
    this.keyboard = null;
  }

  static renderTextArea() {
    const textArea = document.createElement('textarea');
    textArea.autofocus = true;
    document.body.appendChild(textArea);
    return textArea;
  }

  createKeyboard() {
    this.keyboard = document.createElement('ul');
    this.keyboard.classList.add('keyboard');
    this.renderKeyBoard(this.langStorage.getLang());
    document.body.appendChild(this.keyboard);

    const additionalInfo = document.createElement('div');
    additionalInfo.classList.add('additionalInfo');
    additionalInfo.innerHTML = 'Клавиатура разработана на OS Linux Mint. Для переключения на другой язык, используйте сочетание клавиш <kbd>Ctrl</kbd>+<kbd>Shift</kbd> либо <b>ОРАНЖЕВУЮ</b> кнопку виртуальной клавиатуры';
    document.body.appendChild(additionalInfo);
    return this.keyboard;
  }

  renderKeyBoard(locale) {
    const isCapsLockKeySelected = this.keyboard.querySelector('.capslock.on') != null;
    const pressedKeys = Array.from(
      this.keyboard.querySelectorAll('.pressed'),
      (item) => item.dataset.code,
    );
    this.keyboard.innerHTML = '';
    this.keyMap.forEach((row) => {
      row.forEach((keyInfo) => {
        const key = document.createElement('li');
        const mainText = keyInfo.getMainText(locale);
        key.innerText = mainText;
        key.dataset.mainText = mainText;
        key.dataset.code = keyInfo.code;
        if (pressedKeys.indexOf(key.dataset.code) > -1) {
          key.classList.add('pressed');
        }
        if (keyInfo.additionalCssClasses && keyInfo.additionalCssClasses.length > 0) {
          key.classList.add(keyInfo.additionalCssClasses);
        }
        const additionalText = keyInfo.getAdditionalText(locale);
        if (additionalText) {
          key.dataset.additionalText = additionalText;
          const leftTopCornerSymbol = document.createElement('span');
          leftTopCornerSymbol.innerText = additionalText;
          leftTopCornerSymbol.classList.add('leftTopCornerSymbol');
          key.appendChild(leftTopCornerSymbol);
        }
        this.keyboard.appendChild(key);
      });
      this.keyboard.appendChild(document.createElement('br'));
    });
    if (isCapsLockKeySelected) {
      this.keyboard.querySelector('.capslock').classList.add('on');
    }
  }
}
