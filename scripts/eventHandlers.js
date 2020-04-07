/* Inner Functions */
const getSymbolForPrinting = (dataSet, keyboard) => {
  let textForPrint;
  switch (dataSet.code) {
    case 'Enter':
      textForPrint = '\n';
      break;
    case 'Tab':
      textForPrint = '\t';
      break;
    default: {
      const isShiftKeySelected = keyboard.querySelector('.shift.on') != null;
      const isCapsLockOn = keyboard.querySelector('.capslock.on') != null;
      if (dataSet.additionalText) {
        textForPrint = isShiftKeySelected ? dataSet.additionalText : dataSet.mainText;
      } else {
        textForPrint = dataSet.mainText;
      }
      if ((isCapsLockOn && !isShiftKeySelected) || (!isCapsLockOn && isShiftKeySelected)) {
        textForPrint = textForPrint.toUpperCase();
      } else {
        textForPrint = textForPrint.toLowerCase();
      }
    }
  }
  return textForPrint;
};

const unSelectFuncKeys = (keyboard, eventInfo) => {
  const ctrlKeys = Array.prototype.slice.call(keyboard.querySelectorAll('.control.on'));
  let shiftKeys = [];
  if (!eventInfo.shiftKey) {
    shiftKeys = Array.prototype.slice.call(keyboard.querySelectorAll('.shift.on'));
  }
  const altKeys = Array.prototype.slice.call(keyboard.querySelectorAll('.alt.on'));
  const funcKeys = [];
  funcKeys.push(...ctrlKeys, ...shiftKeys, ...altKeys);
  funcKeys.forEach((key) => {
    key.classList.remove('on');
  });
};

const removePrevSymbol = (textArea) => {
  const cursorPosition = textArea.selectionStart;
  if (cursorPosition > 0) {
    const text = textArea.value;
    textArea.value = text.substring(0, cursorPosition - 1) + text.substring(cursorPosition);
  }
};

const removeNextSymbol = (textArea) => {
  const cursorPosition = textArea.selectionStart;
  const text = textArea.value;
  if (cursorPosition < text.length) {
    textArea.value = text.substring(0, cursorPosition) + text.substring(cursorPosition + 1);
  }
};

const processPressedKey = (pressedKey, textArea, keyboard, langStorage, eventInfo) => {
  let currentPosition = textArea.selectionStart;
  if (pressedKey) {
    const isCtrlKeySelected = keyboard.querySelector('.control.on') != null;
    const isShiftKeySelected = keyboard.querySelector('.shift.on') != null;
    switch (pressedKey.dataset.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        pressedKey.classList.toggle('on');
        if (isCtrlKeySelected) {
          langStorage.toggleLang();
        }
        break;
      case 'ControlLeft':
      case 'ControlRight':
        pressedKey.classList.toggle('on');
        if (isShiftKeySelected) {
          langStorage.toggleLang();
        }
        break;
      case 'CapsLock':
        pressedKey.classList.toggle('on');
        break;
      case 'AltLeft':
      case 'AltRight':
        pressedKey.classList.toggle('on');
        break;
      case 'Lang':
        langStorage.toggleLang();
        break;
      case 'Backspace':
        removePrevSymbol(textArea);
        if (currentPosition > 0) {
          currentPosition -= 1;
        }
        break;
      case 'Delete':
        removeNextSymbol(textArea);
        break;
      case 'ArrowLeft':
        if (currentPosition > 0) {
          currentPosition -= 1;
        }
        break;
      case 'ArrowRight':
        currentPosition += 1;
        break;
      default:
        textArea.value = textArea.value.substring(0, currentPosition)
          + getSymbolForPrinting(pressedKey.dataset, keyboard)
          + textArea.value.substring(currentPosition);
        currentPosition += 1;
        unSelectFuncKeys(keyboard, eventInfo);
    }
    textArea.selectionStart = currentPosition;
    textArea.selectionEnd = currentPosition;
    textArea.focus();
  }
};

/* Inner Functions */

export const addEventListenersForVirtualKeyboard = (keyboard, textArea, keyMap, langStorage) => {
  keyboard.addEventListener('click', (e) => {
    let pressedKey;
    if (e.target.tagName === 'LI') {
      pressedKey = e.target;
    } else if (e.target.parentNode.tagName === 'LI') {
      pressedKey = e.target.parentNode;
    }
    processPressedKey(pressedKey, textArea, keyboard, langStorage, e);
  });

  keyboard.addEventListener('mousedown', (e) => {
    let pressedKey;
    if (e.target.tagName === 'LI') {
      pressedKey = e.target;
    } else if (e.target.parentNode.tagName === 'LI') {
      pressedKey = e.target.parentNode;
    }
    if (pressedKey) {
      pressedKey.classList.add('pressed');
    }
  });

  keyboard.addEventListener('mouseup', (e) => {
    let pressedKey;
    if (e.target.tagName === 'LI') {
      pressedKey = e.target;
    } else if (e.target.parentNode.tagName === 'LI') {
      pressedKey = e.target.parentNode;
    }
    if (pressedKey) {
      pressedKey.classList.remove('pressed');
    }
  });
};

export const addEventListenersForPhysicalKeyboard = (keyboard, textArea, langStorage) => {
  document.addEventListener('keydown', (e) => {
    if (e.target === textArea) {
      e.preventDefault();
    }
    const pressedKeyCode = e.code;
    const virtualKey = keyboard.querySelector(`li[data-code="${pressedKeyCode}"]`);
    if (virtualKey) {
      virtualKey.classList.add('pressed');
    }
    processPressedKey(virtualKey, textArea, keyboard, langStorage, e);
  });

  document.addEventListener('keyup', (e) => {
    if (e.target === textArea) {
      e.preventDefault();
    }
    const pressedKeyCode = e.code;
    const virtualKey = keyboard.querySelector(`li[data-code="${pressedKeyCode}"]`);
    if (virtualKey) {
      virtualKey.classList.remove('pressed');
      if (pressedKeyCode !== 'CapsLock') {
        virtualKey.classList.remove('on');
      }
      virtualKey.classList.remove('pressed');
    }
  });
};
