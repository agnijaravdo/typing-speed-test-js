function startCountDown(element) {
  let x = setInterval(() => {
    let seconds = parseInt(element.innerText);
    seconds--;
    element.innerText = seconds;
    if (seconds == 0) {
      clearInterval(x);
      element.innerText = 'TIME EXPIRED';
    }
  }, 1000);
}

function startCountDOwnOnKeydown(timerElement) {
  let isCountdownStarted = false;
  document.addEventListener('keydown', function (e) {
    if (e.key.length === 1 && !isCountdownStarted) {
      isCountdownStarted = true;
      startCountDown(timerElement);
    }
    console.log(e.key);
  });
}

export default startCountDOwnOnKeydown;
