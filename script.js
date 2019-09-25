var randomNumber = Math.floor(Math.random() * 10) + 1;
var guessCount = 0;
var guessField = document.getElementById("guessField");
var pastGuesses = document.getElementById("pastGuesses");
var guesses = document.getElementById("guesses");
var message = document.getElementById("message");
var guessButton = document.getElementById('guessButton')

function checkGuess() {
  var userGuess = guessField.value;
  pastGuesses.innerHTML += userGuess + " ";
  if (guessCount == 10) {
    message.innerHTML = "!!!GAME OVER!!!";
    message.style.color = "red"
    disableForm(guessField, guessButton);
  } else {
    if (userGuess == randomNumber) {
      message.innerHTML = "Congratulations! You got it right!";
      message.style.color = "green"
      disableForm(guessField, guessButton);
    } else {
      if (userGuess < randomNumber) {
        message.innerHTML = "Your guess is too low!";
      } else if (userGuess > randomNumber) {
        message.innerHTML = "Your guess is too high!";
      }
    }
    guessCount++;
    guesses.innerHTML = 10 - guessCount;
    guessField.value = "";
  }
  guessField.focus();
}

function disableForm(guessField, guessButton) {
  var form = document.querySelector(".form");
  form.style.opacity = 0.5;
  guessField.setAttribute("disabled", "disabled");
  guessButton.setAttribute("disabled", "disabled");
}
