function handleTurn(game) {
  let input    = $('#player-input')
  ,   guess    = +input.val()
  ,   feedback = game.playersGuessSubmission(guess)
  ,   prompt   = ''
  ,   cssKlass = null
  ;

  cssKlass = feedback === ResourceString[sBurn]     ? 'burn'
           : feedback === ResourceString[sIceCold]  ? 'ice-cold'
           : feedback === ResourceString[sLukewarm] ? 'lukewarm'
           : null;
  // render input & guesses.
  input.val('');

  game.pastGuesses.forEach((g, i) => {
    let el = $(`ul#guess-list li:nth-child(${i+1})`);
    el.text(g);
    if (game.pastGuesses.length-1 === i && cssKlass) el.addClass(cssKlass);
  });

  if (feedback === ResourceString[sGuessAgain]) {
    $('h3').text(feedback);
    $('h1').text("Guess Again!");
  } else if (feedback === ResourceString[sWin] ||
             feedback === ResourceString[sLose]) {
    $('input').prop( "disabled", true );
    $('#submit').prop( "disabled", true );
    $('#hint').prop( "disabled", true );
    $('h1').text(feedback);
    $('h3').text("Play Again?");
  } else {
    prompt = game.isLower() ? 'higher' : 'lower';
    prompt = `${feedback} Try ${prompt}.`
    $('h3').text(prompt);
  }
}

$(document).ready(function() {
  let game = new Game();

  $('#reset').on('click', function(event){
    $('#player-input').val('');
    game.pastGuesses.forEach((_, i) => {
      let el = $(`ul#guess-list li:nth-child(${i+1})`);
      el.text('-').removeClass('ice-cold lukewarm burn');
    });
    game = new Game();
    $('h3').text(ResourceString[sPrompt]);
    $('input').prop( "disabled", false );
    $('#submit').prop( "disabled", false );
    $('#hint').prop( "disabled", false );
  });

  $('#submit').on('click', function(event){
    handleTurn(game);
  });

  $('#player-input').on('keypress', function(event) {
    if (event.key === 'Enter') {
      handleTurn(game);
    }
  });
});
