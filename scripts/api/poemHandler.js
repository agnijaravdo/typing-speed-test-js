import getPoem from './poetryAPI.js';
import {
  showLoader,
  hideLoader,
  showError,
  addLineWordAndLetterElements,
} from '../utils/domUtils.js';
import config from '../config.js';

async function fetchAndDisplayPoem(textContainer) {
  showLoader(textContainer);

  try {
    const poemLines = await getPoem();
    // let poemLines = JSON.parse(localStorage.getItem('poemLines'));

    // if (!poemLines) {
    //   poemLines = await getPoem();
    //   localStorage.setItem('poemLines', JSON.stringify(poemLines));
    // }
    // TODO: remove above before final version

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
