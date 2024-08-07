import calculateWPMandAccuracy from './resultsCalculator.js';
import { addTypingResultsElements } from './utils/domUtils.js';

function startCountDown(element, getTypingResults, storeGameResults) {
  let seconds = parseInt(element.innerText);
  const interval = setInterval(() => {
    seconds--;
    element.innerText = seconds;
    if (seconds === 0) {
      clearInterval(interval);
      element.innerText = 'TIME EXPIRED';
      const typingResults = getTypingResults();
      const { wpm, accuracy } = calculateWPMandAccuracy(
        typingResults.correctlyTypedWords,
        typingResults.overallTypedWords
      );
      addTypingResultsElements(wpm, accuracy);
      storeGameResults(wpm, accuracy);
    }
  }, 1000);
  return interval;
}

function startCountDownOnKeydown(
  timerElement,
  getTypingResults,
  storeGameResults
) {
  let isCountdownStarted = false;
  let intervalId = null;

  function handleKeydown(e) {
    if (
      !isCountdownStarted &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.metaKey
    ) {
      isCountdownStarted = true;
      document.removeEventListener('keydown', handleKeydown);

      intervalId = startCountDown(
        timerElement,
        getTypingResults,
        storeGameResults
      );
    }
  }

  document.addEventListener('keydown', handleKeydown);

  return {
    clear() {
      document.removeEventListener('keydown', handleKeydown);
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    },
  };
}

export default startCountDownOnKeydown;
