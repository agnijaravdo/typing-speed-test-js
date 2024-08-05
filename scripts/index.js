import getPoem from './api.js';
import config from './config.js';

import {
  showLoader,
  hideLoader,
  showError,
  addLineWordAndLetterElements,
} from './domUtils.js';

document.addEventListener('DOMContentLoaded', async () => {
  const textContainer = document.querySelector('.text-box');

  showLoader(textContainer);

  try {
    const poemLines = await getPoem();

    if (Array.isArray(poemLines)) {
      textContainer.classList.add('text-box-loaded');
      addLineWordAndLetterElements(poemLines, textContainer);
    } else {
      showError(textContainer, config.errorMessage.invalidData);
    }
  } catch (error) {
    showError(textContainer, error.message);
  } finally {
    hideLoader(textContainer);
  }
});
