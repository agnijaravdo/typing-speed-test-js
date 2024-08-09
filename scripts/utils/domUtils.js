import config from '../config.js';

function showLoader(textContainer) {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.innerText = 'Loading...';
  textContainer.appendChild(loader);
}

function hideLoader(textContainer) {
  const loader = textContainer.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
}

function showError(container, errorMessage = config.errorMessage.generic) {
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('text-box');
  errorDiv.id = 'error-message';
  console.error(errorMessage); // To not show API error for the user in UI
  errorDiv.innerText = config.errorMessage.generic;
  container.appendChild(errorDiv);
}

function addLetterElement(letters, lineIndex, wordIndex, wordSpan) {
  letters.forEach((letter, letterIndex) => {
    const letterSpan = document.createElement('span');
    letterSpan.id = `letter-${lineIndex}-${wordIndex}-${letterIndex}`;
    letterSpan.classList.add('letter');
    letterSpan.innerText = letter;
    wordSpan.appendChild(letterSpan);
  });
}

function addWordElement(words, lineIndex, lineDiv) {
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.id = `word-${lineIndex}-${wordIndex}`;
    wordSpan.classList.add('word');
    lineDiv.appendChild(wordSpan);
    const wordWithSpace = wordIndex === words.length - 1 ? word : word + ' ';
    const letters = wordWithSpace.split('');
    addLetterElement(letters, lineIndex, wordIndex, wordSpan);
  });
}

function addLineWordAndLetterElements(poemLines, textContainer) {
  poemLines.forEach((line, lineIndex) => {
    const lineDiv = document.createElement('div');
    lineDiv.id = `line-${lineIndex}`;
    lineDiv.classList.add('line');
    textContainer.appendChild(lineDiv);
    const words = line.split(' ');
    addWordElement(words, lineIndex, lineDiv);
  });
}

function addTypingResultsElements(wpm, accuracy) {
  document.getElementById('wpmValue').innerText = `WPM: ${wpm}`;
  document.getElementById('accuracyValue').innerText = `Accuracy: ${accuracy}%`;
}

function clearTypingResultsElements() {
  document.getElementById('wpmValue').innerText = '';
  document.getElementById('accuracyValue').innerText = '';
}

function addResultsTableHeader() {
  const table = document.getElementById('results-table');
  if (!table.tHead) {
    const header = table.createTHead();
    const headerRow = header.insertRow(0);
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);
    headerCell1.innerText = 'Timestamp';
    headerCell2.innerText = 'Correct WPM';
    headerCell3.innerText = 'Accuracy %';
  }
}

function addResultsTableRow(results) {
  const table = document.getElementById('results-table');
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  cell1.innerText = results.timestamp;
  cell2.innerText = results.wpm;
  cell3.innerText = results.accuracy;
}

function clearTableRows() {
  const table = document.getElementById('results-table');
  // Removing all rows except the header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
}

export const displayPerformanceFeedback = (isRecordWpm, isRecordAccuracy) => {
  const feedbackElement = document.getElementById('performance-feedback');
  let feedbackMessage = '';

  if (isRecordWpm && isRecordAccuracy) {
    feedbackMessage = 'Congratulations! This is your best performance yet!';
  } else if (isRecordWpm) {
    feedbackMessage = 'Great job! You have achieved your fastest typing speed!';
  } else if (isRecordAccuracy) {
    feedbackMessage = 'Impressive! You have achieved your highest accuracy!';
  } else {
    feedbackMessage = 'Keep practicing! You can beat your previous scores!';
  }

  feedbackElement.innerText = feedbackMessage;
  feedbackElement.style.display = 'block';
};

export {
  showLoader,
  hideLoader,
  showError,
  addLineWordAndLetterElements,
  addTypingResultsElements,
  clearTypingResultsElements,
  addResultsTableHeader,
  addResultsTableRow,
  clearTableRows,
};
