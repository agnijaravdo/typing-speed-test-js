import Game from './game.js';

document.addEventListener('DOMContentLoaded', async () => {
  const textContainer = document.querySelector('.text-box');
  const timerElement = document.querySelector('#time');
  const resetButton = document.querySelector('#reset-button');

  const game = new Game(textContainer, timerElement, resetButton);
  await game.initialize();
});
