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

(function(){
  function playClip(letter){
    const upper = letter.toUpperCase();
    const audio = document.getElementById(upper);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play().catch(()=>{});
    const pad = audio.closest('.drum-pad');
    if(pad){
      setDisplay(pad.id);
      flashPad(pad);
    }
  }

  const displayEl = document.getElementById('display');
  function setDisplay(text){ displayEl.textContent = text; }

  function flashPad(pad){
    pad.classList.add('active');
    clearTimeout(pad._timeout);
    pad._timeout = setTimeout(()=> pad.classList.remove('active'), 120);
  }

  document.querySelectorAll('.drum-pad').forEach(pad=>{
    pad.addEventListener('click', ()=>{
      playClip(pad.dataset.key);
    });
    pad.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        playClip(pad.dataset.key);
      }
    });
  });

  window.addEventListener('keydown', e=>{
    const key = e.key.toUpperCase();
    if(/^[QWEASDZXC]$/.test(key)) playClip(key);
  });

  document.querySelectorAll('audio.clip').forEach(a=> a.preload='auto');
})();
