const sBurn       = Symbol('Burning up')
  ,     sLukewarm   = Symbol('Lukewarm')
  ,     sChilly     = Symbol('Chilly')
  ,     sIceCold    = Symbol('IceCold')
  ,     sLose       = Symbol('Lose')
  ,     sWin        = Symbol('Win')
  ,     sGuessAgain = Symbol('GuessAgain')
  ,     sInvalid    = Symbol('Invalid')
  ,     sPlay       = Symbol('PlayTheGuessingGame')
  ,     sPrompt     = Symbol('Prompt')
  ,     sPlayAgain  = Symbol('PlayAgain')

const ResourceString = {
  [sBurn      ] : "You're burning up!",
  [sLukewarm  ] : "You're lukewarm.",
  [sChilly    ] : "You're a bit chilly.",
  [sIceCold   ] : "You're ice cold!",
  [sWin       ] : "You Win!",
  [sLose      ] : "You Lose.",
  [sInvalid   ] : "That is an invalid guess.",
  [sGuessAgain] : "You have already guessed that number.",
  [sPlay      ] : "Guess Seven!",
  [sPrompt    ] : "7 chances to be a winner!",
  [sPlayAgain ] : "Play again?"
}

const GUESSES = 7;

