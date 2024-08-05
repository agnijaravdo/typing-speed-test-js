import getPoem from './poetryAPI.js';
import { showLoader, hideLoader, showError, addLineWordAndLetterElements } from './domUtils.js';
import config from './config.js';

async function fetchAndDisplayPoem(textContainer) {
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
}

export default fetchAndDisplayPoem;
