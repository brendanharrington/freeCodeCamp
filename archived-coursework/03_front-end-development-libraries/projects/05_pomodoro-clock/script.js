// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place. 

/***********
INSTRUCTIONS:
  - Select the project you would 
    like to complete from the dropdown 
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank 
    pen.
  - Click the "TESTS" button to see 
    the individual test cases. 
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go   
    from red to green.
  - As you start to build out your 
    project, when tests are failing, 
    you should get helpful errors 
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments. 

// 25 + 5 Clock implementation
(function(){
  // Default values
  const DEFAULT_BREAK = 5;
  const DEFAULT_SESSION = 25;
  const MIN_LEN = 1;
  const MAX_LEN = 60;

  // Elements (IDs required by FCC tests)
  const breakLabel = document.getElementById('break-label');
  const sessionLabel = document.getElementById('session-label');
  const breakDecrement = document.getElementById('break-decrement');
  const breakIncrement = document.getElementById('break-increment');
  const sessionDecrement = document.getElementById('session-decrement');
  const sessionIncrement = document.getElementById('session-increment');

  const breakLengthEl = document.getElementById('break-length');
  const sessionLengthEl = document.getElementById('session-length');

  const timerLabelEl = document.getElementById('timer-label');
  const timeLeftEl = document.getElementById('time-left');

  const startStopBtn = document.getElementById('start_stop');
  const resetBtn = document.getElementById('reset');

  const beep = document.getElementById('beep');

  // State
  let breakLength = DEFAULT_BREAK;    // minutes
  let sessionLength = DEFAULT_SESSION; // minutes
  let isRunning = false;
  let isSession = true;               // true -> session, false -> break
  let secondsLeft = sessionLength * 60;
  let timerInterval = null;

  // Utility: format mm:ss
  function formatTime(totalSeconds){
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${mm}:${ss}`;
  }

  // Render UI
  function renderAll(){
    breakLengthEl.textContent = breakLength;
    sessionLengthEl.textContent = sessionLength;
    timerLabelEl.textContent = isSession ? 'Session' : 'Break';
    timeLeftEl.textContent = formatTime(secondsLeft);
  }

  // Stop timer interval
  function stopInterval(){
    if(timerInterval !== null){
      clearInterval(timerInterval);
      timerInterval = null;
    }
    isRunning = false;
  }

  // Start timer interval
  function startInterval(){
    if(timerInterval) return;
    isRunning = true;
    timerInterval = setInterval(() => {
      secondsLeft -= 1;
      // Update display each tick
      timeLeftEl.textContent = formatTime(secondsLeft);

      if(secondsLeft < 0){
        // when timer reached below 0, it means it passed 00:00 exactly
        // But we ensure the display hit 00:00 first; we call beep then switch
        // Safeguard: this branch should only run once per boundary
        // Play beep, then switch mode
        beep.play().catch(()=>{});
        // Switch mode
        isSession = !isSession;
        timerLabelEl.textContent = isSession ? 'Session' : 'Break';
        secondsLeft = (isSession ? sessionLength : breakLength) * 60;
        // Immediately update display with new time
        timeLeftEl.textContent = formatTime(secondsLeft);
      } else if(secondsLeft === 0){
        // Ensure 00:00 is displayed and beep plays at exactly 00:00.
        // We'll play beep on reaching 0 and allow next tick to switch.
        timeLeftEl.textContent = '00:00';
        // Play beep
        beep.currentTime = 0;
        beep.play().catch(()=>{});
        // The next tick (secondsLeft becomes -1) will switch to the other mode and reset.
      }
    }, 1000);
  }

  // Toggle start/stop
  function toggleStartStop(){
    if(isRunning){
      stopInterval();
    } else {
      // If not running and secondsLeft is invalid (e.g., NaN), reset to sessionLength
      if(typeof secondsLeft !== 'number' || isNaN(secondsLeft) ) {
        secondsLeft = (isSession ? sessionLength : breakLength) * 60;
      }
      startInterval();
    }
  }

  // Reset behavior
  function resetAll(){
    stopInterval();
    // Reset lengths
    breakLength = DEFAULT_BREAK;
    sessionLength = DEFAULT_SESSION;
    isSession = true;
    secondsLeft = sessionLength * 60;
    // Stop and rewind beep (User Story #28)
    try {
      beep.pause();
      beep.currentTime = 0;
    } catch(e){}
    renderAll();
  }

  // Handle increment/decrement with bounds and while not running
  function setBreakLength(newLen){
    if(newLen < MIN_LEN || newLen > MAX_LEN) return;
    breakLength = newLen;
    // Only change active countdown if currently in break and not running
    if(!isRunning && !isSession){
      secondsLeft = breakLength * 60;
    }
    renderAll();
  }
  function setSessionLength(newLen){
    if(newLen < MIN_LEN || newLen > MAX_LEN) return;
    sessionLength = newLen;
    // Only update time-left if currently session and not running
    if(!isRunning && isSession){
      secondsLeft = sessionLength * 60;
    }
    renderAll();
  }

  // Attach event listeners
  breakDecrement.addEventListener('click', () => {
    // decrement only when > MIN and not running
    if(!isRunning && breakLength > MIN_LEN){
      setBreakLength(breakLength - 1);
    } else if (!isRunning && breakLength === MIN_LEN){
      // don't allow <= 0
    } else if (isRunning) {
      // don't change while running
    }
  });

  breakIncrement.addEventListener('click', () => {
    if(!isRunning && breakLength < MAX_LEN) setBreakLength(breakLength + 1);
  });

  sessionDecrement.addEventListener('click', () => {
    if(!isRunning && sessionLength > MIN_LEN) setSessionLength(sessionLength - 1);
  });

  sessionIncrement.addEventListener('click', () => {
    if(!isRunning && sessionLength < MAX_LEN) setSessionLength(sessionLength + 1);
  });

  startStopBtn.addEventListener('click', () => {
    toggleStartStop();
  });

  resetBtn.addEventListener('click', () => {
    resetAll();
  });

  // Keyboard support (optional): space toggles start/stop, 'r' resets
  window.addEventListener('keydown', (e) => {
    if(e.code === 'Space'){
      e.preventDefault();
      toggleStartStop();
    } else if(e.key.toLowerCase() === 'r'){
      resetAll();
    }
  });

  // Initialize UI
  resetAll();

  // Expose for debugging (optional)
  window._clock = {
    state: () => ({ breakLength, sessionLength, isRunning, isSession, secondsLeft }),
    start: () => { if(!isRunning) toggleStartStop(); },
    stop: () => { if(isRunning) toggleStartStop(); },
    reset: resetAll
  };
})();
