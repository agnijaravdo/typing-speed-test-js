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
      lineDiv.innerText = line;
      textContainer.appendChild(lineDiv);
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
