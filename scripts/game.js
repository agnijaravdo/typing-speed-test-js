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
    this.countDownController = null;
  }

  initialize = async () => {
    await this.startNewGame();
    this.resetButton.addEventListener('click', this.reset);
    document.addEventListener('keydown', this.handleKeyPress);
  };

  handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      this.reset();
    } else if (e.key === 'Enter') {
      this.restartWithoutFetchingNewPoem();
    }
  };

  restartWithoutFetchingNewPoem = () => {
    clearTypingResultsElements();
    if (this.countDownController) {
      this.countDownController.clear();
    }
    this.restartGameComponents();
  };

  async startNewGame() {
    await fetchAndDisplayPoem(this.textContainer);
    this.restartGameComponents();
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

  restartGameComponents() {
    this.typingHighlighter.reset();
    this.typingHighlighter.initialize();
    this.setupCountdown();
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
