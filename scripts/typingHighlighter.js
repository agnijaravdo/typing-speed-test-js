class TypingHighlighter {
  constructor(textContainer) {
    this.letters = Array.from(textContainer.querySelectorAll('.letter'));
    this.lettersArray = this.letters.map((letter) => letter.textContent);
    this.words = Array.from(textContainer.querySelectorAll('.word'));
    this.wordsArray = this.words.map((word) => word.textContent.split(''));
    this.currentLetterIndex = 0;
    this.currentWordIndex = 0;
    this.typedWord = [];
    this.correctlyTypedWordCount = 0;
    this.wordsTypedCount = 0;

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  updateWordHighlight() {
    this.words.forEach((word, i) => {
      word.style.setProperty(
        'text-decoration',
        i === this.currentWordIndex ? 'underline' : 'none'
      );
    });
  }

  handleKeyDown(e) {
    if (this.currentLetterIndex < this.lettersArray.length) {
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        this.handleTyping(e.key);
      } else if (e.key === 'Backspace') {
        this.handleBackspace();
      }
    } else {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
    e.preventDefault();
  }

  handleBackspace() {
    if (this.currentLetterIndex > 0) {
      this.currentLetterIndex--;
      const lastTypedCharacter = this.typedWord.pop();
      this.letters[this.currentLetterIndex].classList.remove(
        'bg-success',
        'bg-danger',
        'bg-opacity-50'
      );

      // Crossing word boundary, moving to the previous word and not mutating the original array
      if (
        this.lettersArray[this.currentLetterIndex] === ' ' &&
        lastTypedCharacter !== ' '
      ) {
        this.currentWordIndex--;
        this.typedWord = this.wordsArray[this.currentWordIndex].slice(0, -1);
      }

      this.updateWordHighlight();
    } else {
      this.currentLetterIndex = 0;
      this.currentWordIndex = 0;
      this.typedWord = [];
      this.updateWordHighlight();
    }
  }

  handleTyping(key) {
    const currentLetter = this.lettersArray[this.currentLetterIndex];
    const currentLetterElement = this.letters[this.currentLetterIndex];

    if (key === currentLetter) {
      currentLetterElement.classList.add('bg-success', 'bg-opacity-50');
    } else {
      currentLetterElement.classList.add('bg-danger', 'bg-opacity-50');
    }

    this.typedWord.push(key);
    this.currentLetterIndex++;

    if (
      this.typedWord.length === this.wordsArray[this.currentWordIndex].length
    ) {
      this.wordsTypedCount++;

      if (
        this.typedWord.join('') ===
        this.wordsArray[this.currentWordIndex].join('')
      ) {
        this.correctlyTypedWordCount++;
      }

      this.currentWordIndex++;
      this.typedWord = [];
      if (this.currentWordIndex < this.wordsArray.length) {
        this.updateWordHighlight();
      }
    }
  }

  initialize() {
    this.updateWordHighlight();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  getTypingResults() {
    return {
      correctlyTypedWords: this.correctlyTypedWordCount,
      overallTypedWords: this.wordsTypedCount,
    };
  }
}

export default TypingHighlighter;
