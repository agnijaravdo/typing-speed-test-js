import calculateWPMandAccuracy from './resultsCalculator.js';
import { addTypingResultsElements } from './domUtils.js';

function startCountDown(element, getTypingResults) {
  let x = setInterval(() => {
    let seconds = parseInt(element.innerText);
    seconds--;
    element.innerText = seconds;
    if (seconds == 0) {
      clearInterval(x);
      element.innerText = 'TIME EXPIRED';
      const typingResults = getTypingResults();
      const { wpm, accuracy } = calculateWPMandAccuracy(
        typingResults.correctlyTypedWords,
        typingResults.overallTypedWords
      );
      addTypingResultsElements(wpm, accuracy);
    }
  }, 1000);
}

function startCountDownOnKeydown(timerElement, getTypingResults) {
  let isCountdownStarted = false;
  document.addEventListener('keydown', function (e) {
    if (e.key.length === 1 && !isCountdownStarted) {
      isCountdownStarted = true;
      startCountDown(timerElement, getTypingResults);
    }
  });
}

export default startCountDownOnKeydown;
