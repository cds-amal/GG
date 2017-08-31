function generateWinningNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function shuffle(A) {
  let last = A.length
  ,   i
  ;

  while (last !== 0) {
    // choose randomly & swap
    i = Math.floor(Math.random() * last--);
    [A[last], A[i]] = [A[i], A[last]];
  }
  return A;
}

function Game() {
  this.playersGuess  = null;
  this.pastGuesses   = [];
  this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
  return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function() {
  return this.playersGuess < this.winningNumber;
}

Game.prototype.checkGuess = function() {
  let offset = this.difference()
  ,   dupGuess = this.pastGuesses.indexOf(this.playersGuess) !== -1
  ,   nGuesses
  ;

  if (!dupGuess) this.pastGuesses.push(this.playersGuess);
  nGuesses = this.pastGuesses.length;

  let msg = !offset               ? sWin
       : nGuesses === MAX_GUESSES ? sLose
       : offset < BURN_RANGE      ? sBurn
       : offset < LUKEWARM_RANGE  ? sLukewarm
       : offset < CHILLY_RANGE    ? sChilly
       : dupGuess                 ? sGuessAgain
       : sIceCold
       ;
  return msg;
}

Game.prototype.playersGuessSubmission = function(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) throw (sInvalid);
  this.playersGuess = guess;
  return this.checkGuess();
}

Game.prototype.provideHint = function() {
  return shuffle([0, 0].map(generateWinningNumber)
                       .concat(this.winningNumber));
}

function newGame() { return new Game(); }
