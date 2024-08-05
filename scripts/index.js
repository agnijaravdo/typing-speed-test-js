import fetchAndDisplayPoem from './poemHandler.js';
import startCountDOwnOnKeydown from './timer.js';
import { highlightTypedLetterBasedOnCorrectness } from './domUtils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const textContainer = document.querySelector('.text-box');
  const timerElement = document.querySelector('#time');

  startCountDOwnOnKeydown(timerElement);
  await fetchAndDisplayPoem(textContainer);
  highlightTypedLetterBasedOnCorrectness();
});
