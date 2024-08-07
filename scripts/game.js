import fetchAndDisplayPoem from './poemHandler.js';
import startCountDownOnKeydown from './timer.js';
import TypingHighlighter from './typingHighlighter.js';
import { clearTypingResultsElements } from './domUtils.js';

class Game {
  constructor(textContainer, timerElement, resetButton) {
    this.textContainer = textContainer;
    this.timerElement = timerElement;
    this.resetButton = resetButton;
    this.typingHighlighter = new TypingHighlighter(this.textContainer);
    this.reset = this.reset.bind(this);
    this.countDownController = null;
  }

  async initialize() {
    await this.startNewGame();
    this.resetButton.addEventListener('click', this.reset);
  }

  async startNewGame() {
    await fetchAndDisplayPoem(this.textContainer);
    this.typingHighlighter.reset();
    this.typingHighlighter.initialize();
    this.setupCountdown();
  }

  setupCountdown() {
    if (this.countDownController) {
      this.countDownController.clear();
    }
    this.timerElement.innerText = '10';
    this.countDownController = startCountDownOnKeydown(this.timerElement, () =>
      this.typingHighlighter.getTypingResults()
    );
  }

  reset() {
    clearTypingResultsElements();
    this.textContainer.innerHTML = '';
    if (this.countDownController) {
      this.countDownController.clear();
    }
    this.startNewGame();
  }
}

export default Game;
