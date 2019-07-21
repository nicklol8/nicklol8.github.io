$(() => {
  //
  // All for Pokedex
  //
  const $container = $('#container');
  let currentImageIndex = 0;
  let highestIndex = 0;
  let currentStreak = 0;

  // making the pokéinfo info display
  $('#btn-info').on('click', () => {
    $container.empty();
    const $div = $('<div>').addClass('pokedex');
    const $circle = $('<div>').addClass('pokedex-camera');
    const $form = $('<form>').addClass('form');
    const $input = $('<input>')
      .attr('type', 'text')
      .attr('id', 'poke-search');

    //search pokemon
    const $btnSearch = $('<button>')
      .addClass('info-btn')
      .text('Search')
      .on('click', event => {
        currentImageIndex = 0;
        event.preventDefault();
        $divImg.empty();
        $divImgText.empty();
        $divInfo.empty();
        const $pokemon = $('#poke-search')
          .val()
          .toLowerCase();
        $('#poke-search').val('');
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${$pokemon}`;
        $.ajax({ url: endpoint }).then(handleDataInfo);
      });

    //random pokemon
    const $btnRandom = $('<button>')
      .addClass('info-btn')
      .text('Random')
      .on('click', () => {
        currentImageIndex = 0;
        event.preventDefault();
        $divImg.empty();
        $divImgText.empty();
        $divInfo.empty();
        $('#poke-search').val('');
        const $pokemon = Math.ceil(Math.random() * 807);
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${$pokemon}`;
        $.ajax({ url: endpoint }).then(handleDataInfo);
      });

    //putting it all together
    const $divTop = $('<div>').addClass('info-top');
    const $divImg = $('<div>').addClass('infoImage');
    const $divImgText = $('<div>').addClass('infoImageText');
    const $divBot = $('<div>').addClass('info-bot');
    const $divInfo = $('<div>').addClass('infoStats');
    $divTop.append($circle, $divImg, $divImgText);
    $divBot.append($input, $btnSearch, $btnRandom, $divInfo);
    $form.append($divTop, $divBot);
    $div.append($form);
    $container.append($div);

    // image carousel
    const handleDataInfo = data => {
      const $btnNext = $('<div>')
        .addClass('carousel-btnNext')
        .on('click', () => {
          if (currentImageIndex < highestIndex) {
            $('.infoImageText').text($sprite[currentImageIndex + 1][1]);
            $sprite[currentImageIndex][0].replaceWith(
              $sprite[currentImageIndex + 1][0]
            );
            currentImageIndex++;
          } else {
            $('.infoImageText').text($sprite[0][1]);
            $sprite[currentImageIndex][0].replaceWith($sprite[0][0]);
            currentImageIndex = 0;
          }
        });
      const $btnPrev = $('<div>')
        .addClass('carousel-btnPrev')
        .on('click', () => {
          if (currentImageIndex > 0) {
            $('.infoImageText').text($sprite[currentImageIndex - 1][1]);
            $sprite[currentImageIndex][0].replaceWith(
              $sprite[currentImageIndex - 1][0]
            );
            currentImageIndex--;
          } else {
            $('.infoImageText').text($sprite[highestIndex][1]);
            $sprite[currentImageIndex][0].replaceWith($sprite[highestIndex][0]);
            currentImageIndex = highestIndex;
          }
        });

      // adding sprites
      const $sprite = [];
      for (let images in data.sprites) {
        if (data.sprites[images] !== null) {
          if (images === 'front_default') {
            $sprite.splice(0, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Front'
            ]);
          } else if (images === 'back_default') {
            $sprite.splice(1, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Back'
            ]);
          } else if (images === 'front_shiny') {
            $sprite.splice(2, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Shiny Front'
            ]);
          } else if (images === 'back_shiny') {
            $sprite.splice(1, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Shiny Back'
            ]);
          } else if (images === 'front_female') {
            $sprite.splice(3, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Female Front'
            ]);
          } else if (images === 'back_female') {
            $sprite.splice(5, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Female Back'
            ]);
          } else if (images === 'front_shiny_female') {
            $sprite.splice(6, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Shiny Female Front'
            ]);
          } else if (images === 'back_shiny_female') {
            $sprite.splice(7, 0, [
              $('<img>')
                .attr('src', data.sprites[images])
                .addClass('pokePic'),
              'Shiny Female Back'
            ]);
          }
        }
      }

      highestIndex = $sprite.length - 1;
      $('.infoImage').append($btnPrev);
      $('.infoImage').append($sprite[0][0]);
      $('.infoImage').append($btnNext);
      $('.infoImageText').append($sprite[0][1]);

      //adding types and info

      const $name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      let $type = ``;
      for (let i = data.types.length - 1; i >= 0; i--) {
        if (i >= 1) {
          $type += ` ${data.types[i].type.name.charAt(0).toUpperCase() +
            data.types[i].type.name.slice(1)} /`;
        } else {
          $type += ` ${data.types[i].type.name.charAt(0).toUpperCase() +
            data.types[i].type.name.slice(1)} `;
        }
      }
      const $displayName = $('<h3>').text(`${$name}  #${data.id}`);
      const $displayType = $('<h4>').text(`Type: ${$type}`);
      $('.infoStats').append($displayName, $displayType);

      const handleDataExtra = newData => {
        const searchForFlavor = (key, array) => {
          for (let i = 0; i < array.length; i++) {
            if (array[i].language.name === key) {
              return array[i];
            }
          }
        };
        const $flavorText = searchForFlavor('en', newData.flavor_text_entries);
        const flavorText = $('<p>').text($flavorText.flavor_text);
        $('.infoStats').append(flavorText);
      };
      const nextpoint = `https://pokeapi.co/api/v2/pokemon-species/${
        data.name
      }`;
      $.ajax({ url: nextpoint }).then(handleDataExtra);
    };
  });
  //
  // For Who's that pokemon?
  //
  $('#btn-who').on('click', () => {
    //START NEW GAME
    const startNewGame = () => {
      $container.empty();
      const $randomGuess = Math.ceil(Math.random() * 151);
      const endpointGuess = `https://pokeapi.co/api/v2/pokemon/${$randomGuess}`;
      $.ajax({ url: endpointGuess }).then(handleDataGuessWho);
    };

    //GETTING THE DATA/BUILDING THE LOOKS
    const handleDataGuessWho = dataGuess => {
      const $main = $('<div>').addClass('guessWho');
      // $main.css('background', 'rgba(200,200,200,0.9');
      const $guessTitle = $('<h2>').text("WHO'S THAT POKEMON?");
      const $formWho = $('<form>')
        .addClass('poke-guess-who')
        .on('submit', event => {
          event.preventDefault();
        });
      const $input = $('<input>').attr('id', 'poke-guess');
      const $guessButton = $('<button>')
        .attr('id', 'guess-btn')
        .text('GUESS');
      const $guessArea = $('<div>').addClass('guessArea');
      const $underGuess = $('<div>').addClass('underGuess');
      const $sprite = $('<img>')
        .attr('src', dataGuess.sprites.front_default)
        .addClass('pokeSilhouette');
      $container.append($main.append($guessTitle, $guessArea, $underGuess));
      $formWho.append($input, $guessButton);
      $('.guessArea').append($sprite);
      $guessArea.append($formWho);
      $('#guess-btn').on('click', event => {
        event.preventDefault();
        const $guess = $('#poke-guess')
          .val()
          .toLowerCase();
        if ($guess === dataGuess.name) {
          $('#poke-guess').val('');
          alert(`You got it! It's ${dataGuess.name}`);
          $sprite.css('filter', 'none');
          $formWho.children().remove();
          const nextPokemon = $('<button>')
            .addClass('next-pokemon')
            .text('Try another?')
            .on('click', startNewGame);
          currentStreak++;
          const $currentStreak = $('<div>').text(
            `Current streak: ${currentStreak}`
          );
          $underGuess.append($currentStreak, nextPokemon);
        } else {
          alert('Not it! Try again?');
          currentStreak = 0;
        }
      });
    };
    //STARTING
    $container.empty();
    const $startButton = $('<button>')
      .text('Start New Game')
      .attr('id', 'startGuessWho')
      .on('click', startNewGame);
    $container.append($startButton);
  });
});
