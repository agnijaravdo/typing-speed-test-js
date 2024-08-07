import fetchAndDisplayPoem from './api/poemHandler.js';
import startCountDownOnKeydown from './timer.js';
import TypingHighlighter from './typingHighlighter.js';
import { clearTypingResultsElements } from './utils/domUtils.js';

class Game {
  constructor(textContainer, timerElement, resetButton) {
    this.textContainer = textContainer;
    this.timerElement = timerElement;
    this.resetButton = resetButton;
    this.typingHighlighter = new TypingHighlighter(this.textContainer);
    this.reset = this.reset.bind(this);
    this.countDownController = null;
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  async initialize() {
    await this.startNewGame();
    this.resetButton.addEventListener('click', this.reset);
    document.addEventListener('keydown', this.handleEscapeKey);
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

  handleEscapeKey(e) {
    if (e.key === 'Escape') {
      this.reset();
    }
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
