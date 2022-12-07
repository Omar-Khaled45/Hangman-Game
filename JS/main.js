// Create Letters Array
const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArr = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArr.forEach((e) => {
  // Create span
  let span = document.createElement("span");
  span.className = "letter-box";

  // Create the Letter Text Node
  let theLetter = document.createTextNode(e);

  // Append The Letter To The Span
  span.append(theLetter);

  // Append The Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Add Click Class To Clicked Letter
let letterBoxes = document.querySelectorAll(".letter-box");

// Select Overlay
let overlay = document.querySelector(".overlay");

// Object Of Words & Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
};

// Object Keys
let objKeys = Object.keys(words);

// Get Random Property
let randNum = Math.floor(Math.random() * objKeys.length);
let randName = objKeys[randNum];
let randValue = words[randName];
let randWord = randValue[Math.floor(Math.random() * randValue.length)];

// Append Key to Category Element
document.querySelector(".category span").innerHTML = `${randName}`;

// Select Guess Container
let guessEle = document.querySelector(".container .guess");

// Array From Chosen Word
let wordArr = Array.from(randWord.toLowerCase());

// Correct Chosen Letter
let correctAnswer = 0;

// Create Spans Equals to Chosen Word length
wordArr.forEach((e) => {
  let span = document.createElement("span");

  if (e === " ") {
    span.classList.add("space");
    correctAnswer = 1;
  }

  guessEle.appendChild(span);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".container .guess span");

// Add Wrong Attempts
let attempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Select The Play Again Button
let playAgain = document.querySelector(".again");

// Handle Clicking on Letters
document.addEventListener("click", (e) => {
  // Set The Status Of The Chosen Letter
  let status = false;

  if (e.target.classList.contains("letter-box")) {
    // Add Click Class To The Clicked Letter
    e.target.classList.add("clicked");

    // Select The Clicked Letter
    let clickedLetter = e.target.innerHTML.toLowerCase();

    wordArr.forEach((letter, letterIndex) => {
      if (clickedLetter === letter) {
        // Set The Status To True
        status = true;

        // Loop On Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (letterIndex === spanIndex) {
            span.innerHTML = letter;
            correctAnswer++;
          }
        });
      }
    });

    // Congrats Pop Up
    if (correctAnswer === guessSpans.length) {
      congrats();
    }

    // If Letter Is Wrong
    if (status === false) {
      // Increment Wrong Attempts
      attempts++;

      // Add Wrong Class To The Draw
      theDraw.classList.add(`wrong-${attempts}`);

      // Attempts Reach to Its Maximum
      if (attempts === 9) {
        setTimeout(() => {
          endGame();
        }, 700);

        lettersContainer.classList.add("finished");
      }
    }
  }

  console.log(correctAnswer);
});

function endGame() {
  document.querySelector(".popup .game-over").classList.add("endgame");

  overlay.classList.add("endgame");

  document.querySelector(".popup .game-over span").innerHTML = `${randWord}`;

  playAgain.classList.add("endgame");
}

function congrats() {
  document.querySelector(".popup .congrats").classList.add("endgame");

  playAgain.classList.add("endgame");

  overlay.classList.add("endgame");
}

playAgain.addEventListener("click", () => {
  location.reload();
});
