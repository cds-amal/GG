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
  ,     sLuckNext   = Symbol('BetterLuckNextTime')

const ResourceString = {
  [sBurn      ] : "You're burning up!",
  [sLukewarm  ] : "You're lukewarm.",
  [sChilly    ] : "You're a bit chilly.",
  [sIceCold   ] : "You're ice cold!",
  [sWin       ] : "You Win!",
  [sLose      ] : "Oh noes! You Lose.",
  [sInvalid   ] : "That is an invalid guess.",
  [sGuessAgain] : "You have already guessed that number.",
  [sPlay      ] : "Guess Seven!",
  [sPrompt    ] : "Good Luck!",
  [sLuckNext  ] : "Better luck next time."
}

const GUESSES = 7;

