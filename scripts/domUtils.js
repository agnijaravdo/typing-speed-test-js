import config from './config.js';

function showLoader(textContainer) {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.innerText = 'Loading...';
  textContainer.appendChild(loader);
}

function hideLoader(textContainer) {
  const loader = textContainer.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

function showError(container, errorMessage = config.errorMessage.generic) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('text-box');
  errorDiv.id = 'error-message';
  console.error(errorMessage); // To not show API error for the user in UI
  errorDiv.innerText = config.errorMessage.generic;
  container.appendChild(errorDiv);
}

function addLetterElement(letters, lineIndex, wordIndex, wordSpan) {
  letters.forEach((letter, letterIndex) => {
    const letterSpan = document.createElement('span');
    letterSpan.id = `letter-${lineIndex}-${wordIndex}-${letterIndex}`;
    letterSpan.classList.add('letter');
    letterSpan.innerText = letter;
    wordSpan.appendChild(letterSpan);
  });
}

function addWordElement(words, lineIndex, lineDiv) {
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.id = `word-${lineIndex}-${wordIndex}`;
    wordSpan.classList.add('word');
    lineDiv.appendChild(wordSpan);
    const wordWithSpace = wordIndex === words.length - 1 ? word : word + ' ';
    const letters = wordWithSpace.split('');
    addLetterElement(letters, lineIndex, wordIndex, wordSpan);
  });
}

function addLineWordAndLetterElements(poemLines, textContainer) {
  poemLines.forEach((line, lineIndex) => {
    const lineDiv = document.createElement('div');
    lineDiv.id = `line-${lineIndex}`;
    lineDiv.classList.add('line');
    textContainer.appendChild(lineDiv);
    const words = line.split(' ');
    addWordElement(words, lineIndex, lineDiv);
  });
}

function highlightTypedLetterBasedOnCorrectness() {
  const letters = document.querySelectorAll('.letter');
  const lettersArray = Array.from(letters).map((letter) => letter.textContent);

  const words = document.querySelectorAll('.word');
  const wordsArray = Array.from(words).map((word) =>
    word.textContent.split('')
  );

  let currentLetterIndex = 0;
  let currentWordIndex = 0;
  let typedWord = [];

  function updateWordHighlight() {
    for (let i = 0; i < words.length; i++) {
      if (i === currentWordIndex) {
        words[i].style.setProperty('text-decoration', 'underline');
      } else {
        words[i].style.setProperty('text-decoration', 'none');
      }
    }
  }

  updateWordHighlight();

  const handleKeyDown = (e) => {
    if (currentLetterIndex < lettersArray.length) {
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        if (e.key === lettersArray[currentLetterIndex]) {
          letters[currentLetterIndex].classList.add(
            'bg-success',
            'bg-opacity-50'
          );
        } else {
          letters[currentLetterIndex].classList.add(
            'bg-danger',
            'bg-opacity-50'
          );
        }

        typedWord.push(e.key);
        currentLetterIndex++;

        if (typedWord.length === wordsArray[currentWordIndex].length) {
          currentWordIndex++;
          typedWord = [];

          if (currentWordIndex < wordsArray.length) {
            updateWordHighlight();
          }
        }
      }
    } else if (currentLetterIndex >= lettersArray.length) {
      document.removeEventListener('keydown', handleKeyDown);
    }

    e.preventDefault();
  };

  document.addEventListener('keydown', handleKeyDown);
}

export {
  showLoader,
  hideLoader,
  showError,
  addLineWordAndLetterElements,
  highlightTypedLetterBasedOnCorrectness,
};
