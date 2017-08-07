let game = new Game();

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
    this.title    = ko.observable(ResourceString[sPlay]);
    this.subtitle = ko.observable(ResourceString[sPrompt]);
    this.guess    = ko.observable("");
    this.guesses  = ko.observable(blankGuesses());
    this.reset    = function() {
      game = new Game();
      this.title(ResourceString[sPlay]);
      this.subtitle(ResourceString[sPrompt]);
      this.guesses(blankGuesses());
      this.guess('');
    }

    this.turn     = function() {
      let res = game.playersGuessSubmission(+this.guess());

      this.guess("");
      let n  = game.pastGuesses.length
      ,   gs = this.guesses()
      gs[n-1] = game.pastGuesses[n-1];
      this.guesses(gs);

      if (res === sWin || res === sLose) {
        this.title(ResourceString[res])
        this.subtitle(ResourceString[sPlayAgain])
        return;
      }

      if (res === sGuessAgain) {
        this.subtitle(ResourceString[res]);
        return;
      }

      let subtitle =  game.isLower() ? 'Go higher.' : 'Go lower.'
      this.subtitle(subtitle);
      this.title(ResourceString[res]);
    };
}

const state = new AppViewModel();
ko.applyBindings(state);
