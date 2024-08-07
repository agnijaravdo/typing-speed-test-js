function calculateWPMandAccuracy(correctWords, totalTypedWords) {
  const wpm = correctWords; // as per requirement to not calculate not correctly typed words
  const accuracy =
    totalTypedWords > 0
      ? Math.round((correctWords / totalTypedWords) * 100)
      : 0;
  return { wpm, accuracy };
}

export default calculateWPMandAccuracy;
