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

const blankGuesses = () => '-'.repeat(5).split('');

function AppViewModel() {
    // observables enables 2-way binding.
    this.title    = ko.observable(ResourceString[sPlay]);
    this.subtitle = ko.observable(ResourceString[sPrompt]);
    this.guess    = ko.observable("");
    this.guesses  = ko.observable(blankGuesses());

    this.reset = function() {
      game = new Game();
      this.title(ResourceString[sPlay]);
      this.subtitle(ResourceString[sPrompt]);
      this.guesses(blankGuesses());
      this.guess('');
    }

    this.hint = function() {
      //todo
      console.log('hint not implemented.');
    }

    this.turn = function() {

      // invoke game to determine state.
      let res = game.playersGuessSubmission(+this.guess());

      // clear input and update past guesses
      this.guess("");
      let n  = game.pastGuesses.length
      ,   gs = this.guesses()
      gs[n-1] = game.pastGuesses[n-1];
      this.guesses(gs);

      // Game over?
      if (res === sWin || res === sLose) {
        this.title(ResourceString[res])
        this.subtitle(ResourceString[sPlayAgain])
        return;
      }

      // Validation concern from state
      if (res === sGuessAgain) {
        this.subtitle(ResourceString[res]);
        return;
      }

      // Update rest of visual components.
      let subtitle =  game.isLower() ? 'Go higher.' : 'Go lower.'
      this.subtitle(subtitle);
      this.title(ResourceString[res]);
    };
}

const state = new AppViewModel();
ko.applyBindings(state);
