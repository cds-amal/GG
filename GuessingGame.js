const sBurn       = Symbol('Burning up')
,     sLukewarm   = Symbol('Lukewarm')
,     sChilly     = Symbol('Chilly')
,     sIceCold    = Symbol('IceCold')
,     sLose       = Symbol('Lose')
,     sWin        = Symbol('Win')
,     sGuessAgain = Symbol('GuessAgain')
,     sInvalid    = Symbol('Invalid')
,     sPrompt     = Symbol('Prompt')

const ResourceString = {
  [sBurn      ] : "You're burning up!",
  [sLukewarm  ] : "You're lukewarm.",
  [sChilly    ] : "You're a bit chilly.",
  [sIceCold   ] : "You're ice cold!",
  [sWin       ] : "You Win!",
  [sLose      ] : "You Lose.",
  [sInvalid   ] : "That is an invalid guess.",
  [sGuessAgain] : "You have already guessed that number.",
  [sPrompt    ] : "Guess a number between 1-100!"
}

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

  let msg = !offset     ? sWin
       : nGuesses === 5 ? sLose
       : dupGuess       ? sGuessAgain
       : offset < 10    ? sBurn
       : offset < 25    ? sLukewarm
       : offset < 50    ? sChilly
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
