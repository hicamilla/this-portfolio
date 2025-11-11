//===================== WORD ANIMATION =====================
document.addEventListener("DOMContentLoaded", () => {
  const words = document.querySelectorAll(".word");
  if (words.length === 0) return; //Stop if the page has no .word elements

  const wordArray = [];
  let currentWordIndex = 0;
  let intervalId = null;

  //Split each word into spans for letters
  words.forEach(word => {
    const content = word.textContent.trim();
    word.textContent = '';
    const letters = [];

    for (const char of content) {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = char;
      word.appendChild(span);
      letters.push(span);
    }

    wordArray.push(letters);
    word.style.opacity = 0;
  });

  //Show the first word initially
  words[0].style.opacity = 1;

  //Animate letters out
  function animateOut(letters) {
    if (!letters) return;
    letters.forEach((letter, i) => {
      setTimeout(() => {
        letter.className = 'letter out';
        letter.style.opacity = 0;
      }, i * 80);
    });
  }

  //Animate letters in
  function animateIn(letters) {
    if (!letters) return;
    letters.forEach((letter, i) => {
      letter.className = 'letter behind';
      letters[0].parentElement.style.opacity = 1;
      setTimeout(() => {
        letter.className = 'letter in';
        letter.style.opacity = 1;
      }, 340 + i * 80);
    });
  }

  //Function to the next word
  function changeWord() {
    const currentLetters = wordArray[currentWordIndex];
    const nextIndex = (currentWordIndex + 1) % wordArray.length;
    const nextLetters = wordArray[nextIndex];
    if (!currentLetters || !nextLetters) return;

    animateOut(currentLetters);
    animateIn(nextLetters);
    currentWordIndex = nextIndex;
  }

  //Start looping through the words
  function startCycle() {
    if (intervalId) clearInterval(intervalId);
    changeWord();
    intervalId = setInterval(changeWord, 2200);
  }

  //Stop the loop
  function stopCycle() {
    clearInterval(intervalId);
    intervalId = null;
  }

  //Start automatically unless prefers-reduce-motion
  if (!window.matchMedia('(prefers-reduce-motion: reduce)').matches) {
    startCycle();
  }

  //Pause animation when tap is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopCycle();
    else startCycle();
  });
});

// ===================== BACK TO TOP BUTTON =====================
const backToTop = document.createElement("button");
backToTop.id = "backToTop";
backToTop.innerHTML = "↑";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== COMPONENT LOADER =====================
function loadComponent(selector, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to fetch ${file}`);
      return response.text();
    })
  
    .then(data => {
      const target = document.querySelector(selector);
      if (target) target.innerHTML = data;
    })
    .catch(error => console.error(`Error loading ${file}:`, error));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#navbar-placeholder", "/components/navbar.html");
  loadComponent("#footer-placeholder", "/components/footer.html");
});