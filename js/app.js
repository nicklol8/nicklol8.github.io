console.log('linked');
$(() => {
  const $container = $('#container');
  let currentImageIndex = 0;
  let highestIndex = 0;

  // making the pokéinfo info display
  $('#btn-info').on('click', () => {
    $container.empty();
    const $div = $('<div>').addClass('display');
    const $form = $('<form>').addClass('form');
    const $input = $('<input>')
      .attr('type', 'text')
      .attr('id', 'poke-search');

    //search pokemon
    const $btnSearch = $('<button>')
      .addClass('info-btn')
      .text('Search')
      .on('click', event => {
        event.preventDefault();
        currentImageIndex = 0;
        $divImg.empty();
        $divInfo.empty();
        const $pokemon = $('#poke-search')
          .val()
          .toLowerCase();
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${$pokemon}`;
        $.ajax({ url: endpoint }).then(handleDataInfo);
        console.log($pokemon);
      });

    //random pokemon
    const $btnRandom = $('<button>')
      .addClass('info=btn')
      .text('Random')
      .on('click', () => {
        currentImageIndex = 0;
        event.preventDefault();
        $divImg.empty();
        $divImgText.empty();
        $divInfo.empty();
        const $pokemon = Math.floor(Math.random() * 808);
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${$pokemon}`;
        $.ajax({ url: endpoint }).then(handleDataInfo);
      });

    //putting it all together
    const $divImg = $('<div>').addClass('infoImage');
    const $divImgText = $('<div>').addClass('infoImageText');
    const $divInfo = $('<div>').addClass('infoStats');
    $form.append(
      $input,
      $btnSearch,
      $btnRandom,
      $divImg,
      $divImgText,
      $divInfo
    );
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
            // console.log($sprite[currentImageIndex + 1][1]);
            currentImageIndex++;
            // console.log(currentImageIndex);
          } else {
            $('.infoImageText').text($sprite[0][1]);
            $sprite[currentImageIndex][0].replaceWith($sprite[0][0]);
            currentImageIndex = 0;
          }
        });
      const $btnPrev = $('<div>')
        .addClass('carousel-btn')
        .on('click', () => {
          if (currentImageIndex > 0) {
            $('.infoImageText').text($sprite[currentImageIndex - 1][1]);
            $sprite[currentImageIndex][0].replaceWith(
              $sprite[currentImageIndex - 1][0]
            );
            currentImageIndex--;
            console.log(currentImageIndex);
          } else {
            $('.infoImageText').text($sprite[highestIndex][1]);
            $sprite[currentImageIndex][0].replaceWith($sprite[highestIndex][0]);
            currentImageIndex = highestIndex;
          }
        });

      // adding sprites
      const $sprite = [];
      for (let images in data.sprites) {
        // console.log(`${images} -> ${data.sprites[images]}`);
        if (`${data.sprites[images]}` === 'null') {
          images++;
        } else {
          $sprite.push([$('<img>').attr('src', data.sprites[images]), images]);
          //   console.log(images);
        }
      }
      // $sprite.sort((b, a) => {
      //   return a[1].split('_') - b[1].split('_');
      // });
      $sprite.split;
      highestIndex = $sprite.length - 1;
      $('.infoImage').append($btnNext);
      $('.infoImage').prepend($btnPrev);
      $('.infoImage').append($sprite[0][0]);
      $('.infoImageText').append($sprite[0][1]);

      //adding types and info
      const $name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      let $type = ``;
      for (let i = data.types.length - 1; i >= 0; i--) {
        if (i >= 1) {
          $type += ` ${data.types[i].type.name} /`;
        } else {
          $type += ` ${data.types[i].type.name} `;
        }
      }
      const $info = `${$name}, the ${$type}
       pokémon. Pokédex number: ${data.id}. `;
      $('.infoStats').append($info);
    };
  });
});
