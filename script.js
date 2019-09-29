var secretNumber = 0;
var	numberOfGuesses = 0;
var guessField = document.getElementById("guessField");
var historyList = document.getElementById('historyList');
var message = document.getElementById("message");
var guesses = document.getElementById('guesses');
var guessButton = document.getElementById('guessButton')
var retryButton = document.getElementById('retryButton')

function writeMessage(elemToUpdate, message, appendMessage) {
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};

function newGame() {
	secretNumber = Math.floor(Math.random() * 10) + 1;
	numberOfGuesses = 0;
	writeMessage(historyList, '');
}

function guessInRange(guess) {
	return (guess > 0 && guess <= 10);
}

function checkGuess() {
  var userGuess = guessField.value;
  if (numberOfGuesses == 10) {
    writeMessage(message, "!!!GAME OVER!!!");
    message.style.color = "red";
    disableForm();
  } else if (!userGuess || !guessInRange(userGuess)) {
    writeMessage(message, "Please Enter a number between 1-10 and click the button ENTER GUESS");
    message.style.color = "#0066ff";
  }
  else {
    if (userGuess == secretNumber) {
      writeMessage(message, "Congratulations! You got it right!");
      message.style.color = "green";
      disableForm();
      newGame();
    } else {
      if (userGuess < secretNumber) {
        writeMessage(message, "You need to guess higher than " + userGuess + ", try again...");
        message.style.color = "#0066ff";
        writeMessage(historyList, '<li>' + userGuess +' (too low)</li>', true);
      } else if (userGuess > secretNumber) {
        writeMessage(message, "You need to guess lower than " + userGuess + ", try again...");
        message.style.color = "#0066ff";
        writeMessage(historyList, '<li>' + userGuess +' (too high)</li>', true);
      }
    }
    numberOfGuesses++;
    guesses.innerHTML = 10 - numberOfGuesses;
  }
  guessField.value = "";
  guessField.focus();
}

//Check enable state for form when out of guesses or guess sucessfully
function disableForm() {
  retryButton.disabled = false;
  retryButton.style.opacity=1;
  guessField.disabled = true;
  guessField.style.opacity=0.5;
  guessButton.disabled = true;
  guessButton.style.opacity=0.5;
}

function enableForm() {
  guessField.disabled = false;
  guessField.style.opacity=1;
  guessField.focus();
  guessButton.disabled = false;
  guessButton.style.opacity=1;
  retryButton.disabled = true;
  retryButton.style.opacity=0.5;
}

window.onload = function() {
  newGame();
  enableForm();
  guessButton.addEventListener('click', checkGuess);
  retryButton.addEventListener('click', enableForm);
}