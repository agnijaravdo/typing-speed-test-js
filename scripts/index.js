import getPoem from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const textContainer = document.querySelector('.text-box');

  const loader = document.createElement('div');
  loader.innerText = 'Loading...';
  textContainer.appendChild(loader);

  const poemLines = await getPoem();

  if (Array.isArray(poemLines)) {
    textContainer.classList.add('text-box-loaded');
    poemLines.forEach((line, index) => {
      const lineDiv = document.createElement('div');
      lineDiv.id = `line-${index}`;
      textContainer.appendChild(lineDiv);
      const words = line.split(' ');
      words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement('span');
        wordSpan.id = `word-${index}-${wordIndex}`;
        lineDiv.appendChild(wordSpan);
        const wordWithSpace = word + ' ';
        const letters = wordWithSpace.split('');
        letters.forEach((letter, letterIndex) => {
          const letterSpan = document.createElement('span');
          letterSpan.id = `letter-${index}-${wordIndex}-${letterIndex}`;
          letterSpan.innerText = letter;
          wordSpan.appendChild(letterSpan);
        })
      });

    });
  } else {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('text-box');
    errorDiv.id = 'error-message';
    errorDiv.innerText =
      'An error occurred while fetching the poem. Please try again later.';
    textContainer.appendChild(errorDiv);
  }

  loader.remove();
});
