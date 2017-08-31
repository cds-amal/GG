let game = new Game();

// create a handler for the enterkey
ko.bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) { // Enter
                callback.call(viewModel);
                return false;
            }
            return true;
        });
    }
};

const blankGuesses = () => '-'.repeat(MAX_GUESSES).split('');

function AppViewModel() {
    // observables enables 2-way binding.
    this.title    = ko.observable(ResourceString[sPlay]);
    this.subtitle = ko.observable(ResourceString[sPrompt]);
    this.guess    = ko.observable("");
    this.guesses  = ko.observable(blankGuesses());
    this.gameOver = ko.observable(false);
    this.gameIsDirty = ko.observable(false);

    this.reset = function() {
      game = new Game();
      this.title(ResourceString[sPlay]);
      this.subtitle(ResourceString[sPrompt]);
      this.guesses(blankGuesses());
      this.guess('');
      this.gameOver(false);
      this.gameIsDirty(false);
      // force focus to player-input
      document.getElementById("player-input").focus();
    }

    this.hint = function() {
      let hint = game.isLower() ? sHintHigh : sHintLow;
      return  ResourceString[hint]
    }

    this.turn = function() {
      document.getElementById("player-input").focus();

      // retrieve guess and clear input
      let guess = +this.guess();
      this.guess("");

      // invoke game to determine state.
      let gameState;
      try {
        gameState = game.playersGuessSubmission(guess);
      } catch (e) {
        this.subtitle(ResourceString[e]);
        return;
      }

      this.gameIsDirty(true);

      // update previous guesses
      let n  = game.pastGuesses.length
      ,   gs = this.guesses();
      gs[n-1] = game.pastGuesses[n-1];
      this.guesses(gs);

      // Game over?
      if (gameState === sWin || gameState === sLose) {
        this.title(ResourceString[gameState]);
        this.subtitle(ResourceString[sLuckNext]);
        this.gameOver(true);
        this.gameIsDirty(false);
        return;
      }

      // Validation concern from state
      if (gameState === sGuessAgain) {
        this.subtitle(ResourceString[gameState]);
        return;
      }

      // Update rest of visual components.
      let subtitle =  this.hint();
      this.subtitle(subtitle);
      this.title(ResourceString[gameState]);
    };
}

const state = new AppViewModel();
ko.applyBindings(state);
