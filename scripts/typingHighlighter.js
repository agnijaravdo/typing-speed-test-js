function createTypingHighlighter(textContainer) {
  const letters = Array.from(textContainer.querySelectorAll('.letter'));
  const lettersArray = letters.map((letter) => letter.textContent);
  const words = Array.from(textContainer.querySelectorAll('.word'));
  const wordsArray = words.map((word) => word.textContent.split(''));
  let currentLetterIndex = 0;
  let currentWordIndex = 0;
  let typedWord = [];

  function updateWordHighlight() {
    words.forEach((word, i) => {
      word.style.setProperty(
        'text-decoration',
        i === currentWordIndex ? 'underline' : 'none'
      );
    });
  }

  function handleKeyDown(e) {
    if (currentLetterIndex < lettersArray.length) {
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        handleTyping(e.key);
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    e.preventDefault();
  }

  function handleTyping(key) {
    const currentLetter = lettersArray[currentLetterIndex];
    const currentLetterElement = letters[currentLetterIndex];

    if (key === currentLetter) {
      currentLetterElement.classList.add('bg-success', 'bg-opacity-50');
    } else {
      currentLetterElement.classList.add('bg-danger', 'bg-opacity-50');
    }

    typedWord.push(key);
    currentLetterIndex++;

    if (typedWord.length === wordsArray[currentWordIndex].length) {
      currentWordIndex++;
      typedWord = [];
      if (currentWordIndex < wordsArray.length) {
        updateWordHighlight();
      }
    }
  }

  return {
    initialize() {
      updateWordHighlight();
      document.addEventListener('keydown', handleKeyDown);
    },
  };
}

export default createTypingHighlighter;
