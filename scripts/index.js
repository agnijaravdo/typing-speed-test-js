import fetchAndDisplayPoem from './poemHandler.js';
import startCountDownOnKeydown from './timer.js';
import createTypingHighlighter from './typingHighlighter.js';

document.addEventListener('DOMContentLoaded', async () => {
  const textContainer = document.querySelector('.text-box');
  const timerElement = document.querySelector('#time');

  await fetchAndDisplayPoem(textContainer);
  const typingHighlighter = createTypingHighlighter(textContainer);
  typingHighlighter.initialize();
  startCountDownOnKeydown(timerElement, () =>
    typingHighlighter.getTypingResults()
  );
});
