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
  ,     sGrats      = Symbol('Congratulations')
  ,     sHintHigh   = Symbol('Hint Higher')
  ,     sHintLow    = Symbol('Hint Lower')
  ;

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
  [sLuckNext  ] : "Better luck next time.",
  [sGrats     ] : "Contratulations!",
  [sHintHigh  ] : "Go higher.",
  [sHintLow   ] : "Go lower.",
}

const MAX_GUESSES    = 7
,     BURN_RANGE     = 10
,     LUKEWARM_RANGE = 25
,     CHILLY_RANGE   = 50
;

