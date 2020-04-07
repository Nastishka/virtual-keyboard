export const addEventListenersForVirtualKeyboard = (keyboard, textArea, keyMap, langStorage) => {
  keyboard.addEventListener('click', function (e) {
    let pressedKey;
    if (e.target.tagName === 'LI') {
      pressedKey = e.target;
    } else if (e.target.parentNode.tagName == 'LI') {
      pressedKey = e.target.parentNode;
    }
    processPressedKey(pressedKey, textArea, keyboard, langStorage, e);
    console.log(e.target);
    console.log(e);
  });

  keyboard.addEventListener('mousedown', function (e) {
    let pressedKey;
    if (e.target.tagName === 'LI') {
      pressedKey = e.target;
    } else if (e.target.parentNode.tagName == 'LI') {
      pressedKey = e.target.parentNode;
    }
    if (pressedKey) {
      pressedKey.classList.add('pressed');
    }
  });
};

export const addEventListenersForPhysicalKeyboard = (keyboard, textArea, langStorage) => {
  document.addEventListener('keydown', function (e) {
    if (e.target === textArea) {
      e.preventDefault();
    }
    let pressedKeyCode = e.code;
    let virtualKey = keyboard.querySelector(`li[data-code="${pressedKeyCode}"]`);
    if (virtualKey) {
      virtualKey.classList.add('pressed');
    }
    processPressedKey(virtualKey, textArea, keyboard, langStorage, e);
    console.log(e);
  });

  document.addEventListener('keyup', function (e) {
    if (e.target === textArea) {
      e.preventDefault();
    }
    let pressedKeyCode = e.code;
    let virtualKey = keyboard.querySelector(`li[data-code="${pressedKeyCode}"]`);
    if (virtualKey) {
      virtualKey.classList.remove('pressed');
      if (pressedKeyCode != 'CapsLock') {
        virtualKey.classList.remove('on');
      }
    }
  });
};

/*Inner Functions*/
const getSymbolForPrinting = (dataSet, keyboard) => {
  let textForPrint;
  switch (dataSet.code) {
    case 'Enter':
      textForPrint = '\n';
      break;
    case 'Tab':
      textForPrint = '\t';
      break;
    default:
      let isShiftKeySelected = keyboard.querySelector('.shift.on') != null;
      let isCapsLockOn = keyboard.querySelector('.capslock.on') != null;
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
  return textForPrint;
}

const unSelectFuncKeys = (keyboard, eventInfo) => {
  let ctrlKeys = Array.prototype.slice.call(keyboard.querySelectorAll('.control.on'));
  let shiftKeys = [];
  if (!eventInfo.shiftKey) {
    shiftKeys = Array.prototype.slice.call(keyboard.querySelectorAll('.shift.on'));
  }
  let altKeys = Array.prototype.slice.call(keyboard.querySelectorAll('.alt.on'));
  let funcKeys = [];
  funcKeys.push(...ctrlKeys, ...shiftKeys, ...altKeys);
  funcKeys.forEach(key => {
    key.classList.remove('on');
  })
}

const processPressedKey = (pressedKey, textArea, keyboard, langStorage, eventInfo) => {
  let currentPosition = textArea.selectionStart;
  console.log(currentPosition);
  if (pressedKey) {
    let isCtrlKeySelected = keyboard.querySelector('.control.on') != null;
    switch (pressedKey.dataset.code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        pressedKey.classList.toggle('on');
        if (isCtrlKeySelected) {
          langStorage.toggleLang();
          unSelectFuncKeys(keyboard, eventInfo);
        }
        break;
      case 'ControlLeft':
      case 'ControlRight':
        pressedKey.classList.toggle('on');
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
          currentPosition--;
        }
        break;
      case 'Delete':
        removeNextSymbol(textArea);
        break;
      case 'ArrowLeft':
        if (currentPosition > 0) {
          currentPosition--;
        }
        break;
      case 'ArrowRight':
        currentPosition++;
        break;
      case 'ArrowUp':
        currentPosition = calcPositionForUpArrow(textArea);
        break;
      case 'ArrowDown':
        currentPosition = calcPositionForDownArrow(textArea);
        break;
      default:
        textArea.value = textArea.value.substring(0, currentPosition) +
          getSymbolForPrinting(pressedKey.dataset, keyboard) +
          textArea.value.substring(currentPosition);
        currentPosition++;
        unSelectFuncKeys(keyboard, eventInfo);
    }
    pressedKey.classList.remove('pressed');
    textArea.selectionStart = currentPosition;
    textArea.selectionEnd = currentPosition;
    textArea.focus();

  }
}

const calcPositionForUpArrow = (textArea) => {
  let currentPosition = textArea.selectionStart;
  if (currentPosition > 0) {
    let lastSymbolPosition = textArea.value.lastIndexOf('\n', currentPosition - 1);
    let positionInRow = currentPosition - lastSymbolPosition;
    let newPosition = textArea.value.lastIndexOf('\n', lastSymbolPosition - 1) + positionInRow;
    if (newPosition > lastSymbolPosition) {
      newPosition = lastSymbolPosition;
    }
    if (newPosition >= 0) {
      return newPosition;
    }
  }
  return currentPosition;
}

const calcPositionForDownArrow = (textArea) => {
  let currentPosition = textArea.selectionStart;
  let lastSymbolPosition = textArea.value.indexOf('\n', currentPosition);
  if (lastSymbolPosition > 0) {
    let previousLastSymbolPosition = textArea.value.lastIndexOf('\n', currentPosition - 1);
    let positionInRow = currentPosition - previousLastSymbolPosition;
    let newPosition = lastSymbolPosition + positionInRow;
    let nextRowLastSymbolPosition = textArea.value.indexOf('\n', lastSymbolPosition + 1);
    if (nextRowLastSymbolPosition > textArea.value.length || nextRowLastSymbolPosition === -1) {
      nextRowLastSymbolPosition = textArea.value.length;
    }
    if (newPosition > nextRowLastSymbolPosition) {
      newPosition = nextRowLastSymbolPosition;
    }
    return newPosition;
  }
  return currentPosition
}

const removePrevSymbol = (textArea) => {
  let cursorPosition = textArea.selectionStart;
  if (cursorPosition > 0) {
    let text = textArea.value;
    textArea.value = text.substring(0, cursorPosition - 1) + text.substring(cursorPosition);
  }
}

const removeNextSymbol = (textArea) => {
  let cursorPosition = textArea.selectionStart;
  let text = textArea.value;
  if (cursorPosition < text.length) {
    textArea.value = text.substring(0, cursorPosition) + text.substring(cursorPosition + 1);
  }
}

/*Inner Functions*/

