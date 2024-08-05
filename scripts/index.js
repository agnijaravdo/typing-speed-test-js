import fetchAndDisplayPoem from './poemHandler.js';

document.addEventListener('DOMContentLoaded', async () => {
  const textContainer = document.querySelector('.text-box');

  fetchAndDisplayPoem(textContainer);
});
