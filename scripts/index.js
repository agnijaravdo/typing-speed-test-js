import fetchAndDisplayPoem from './poemHandler.js';
import startCountDownOnKeydown from './timer.js';
import TypingHighlighter from './typingHighlighter.js';

document.addEventListener('DOMContentLoaded', async () => {
  const textContainer = document.querySelector('.text-box');
  const timerElement = document.querySelector('#time');

  await fetchAndDisplayPoem(textContainer);
  const typingHighlighter = new TypingHighlighter(textContainer);
  typingHighlighter.initialize();
  startCountDownOnKeydown(timerElement, () =>
    typingHighlighter.getTypingResults()
  );
});
