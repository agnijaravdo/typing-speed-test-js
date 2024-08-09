import fetchAndDisplayPoem from './api/poemHandler.js';
import startCountDownOnKeydown from './timer.js';
import TypingHighlighter from './typingHighlighter.js';
import {
  clearTypingResultsElements,
  addResultsTableRow,
  addResultsTableHeader,
  clearTableRows,
  displayPerformanceFeedback
} from './utils/domUtils.js';

class Game {
  constructor(textContainer, timerElement, resetButton) {
    this.textContainer = textContainer;
    this.timerElement = timerElement;
    this.resetButton = resetButton;
    this.typingHighlighter = new TypingHighlighter(this.textContainer);
    this.countDownController = null;
  }

  initialize = async () => {
    this.hideResults();
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
    this.hideResults();
    if (this.countDownController) {
      this.countDownController.clear();
    }
    this.restartGameComponents();
  };

  async startNewGame() {
    this.hideResults();
    await fetchAndDisplayPoem(this.textContainer);
    this.restartGameComponents();
  }

  setupCountdown() {
    if (this.countDownController) {
      this.countDownController.clear();
    }
    this.timerElement.innerText = '10';
    this.countDownController = startCountDownOnKeydown(
      this.timerElement,
      () => this.typingHighlighter.getTypingResults(),
      this.storeGameResults
    );
  }

  storeGameResults = (wpm, accuracy) => {
    const keys = Object.keys(localStorage);
    let gameResultKeysLength = keys.filter((key) =>
      key.startsWith('gameResults-')
    ).length;

    const results = {
      wpm,
      accuracy,
      timestamp: new Date().toLocaleString('lt-LT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };

    if (!gameResultKeysLength) {
      gameResultKeysLength = 1;
    } else {
      gameResultKeysLength++;
    }
    localStorage.setItem(
      `gameResults-${gameResultKeysLength}`,
      JSON.stringify(results)
    );

    clearTableRows();
    const allGameResults = [];
    for (let i = 1; i <= gameResultKeysLength; i++) {
      allGameResults.push(JSON.parse(localStorage.getItem(`gameResults-${i}`)));
    }

    allGameResults.sort((a, b) => b.timestamp - a.timestamp);
    addResultsTableHeader();
    allGameResults.forEach((result) => {
      addResultsTableRow(result);
    });

    this.showResults();
    this.checkPerformanceImprovement(wpm, accuracy, allGameResults);
  };

  checkPerformanceImprovement = (wpm, accuracy, allGameResults) => {
    let isRecordWpm = true;
    let isRecordAccuracy = true;

    for (let i = 0; i < allGameResults.length - 1; i++) {
      const pastResult = allGameResults[i];
      if (wpm <= pastResult.wpm) {
        isRecordWpm = false;
      }
      if (accuracy <= pastResult.accuracy) {
        isRecordAccuracy = false;
      }
    }

    displayPerformanceFeedback(isRecordWpm, isRecordAccuracy);
  };

  restartGameComponents() {
    this.typingHighlighter.reset();
    this.typingHighlighter.initialize();
    this.setupCountdown();
  }

  reset = () => {
    clearTypingResultsElements();
    this.hideResults();
    this.textContainer.innerText = '';
    if (this.countDownController) {
      this.countDownController.clear();
    }
    this.startNewGame();
  };

  hideResults = () => {
    document.getElementById('results-table').style.display = 'none';
    document.querySelector('.results').style.display = 'none';
    this.textContainer.style.display = 'block';
  };

  showResults = () => {
    document.getElementById('results-table').style.display = 'table';
    document.querySelector('.results').style.display = 'block';
    this.textContainer.style.display = 'none';
  };
}

export default Game;
