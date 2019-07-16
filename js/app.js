console.log('linked');
$(() => {
  const $container = $('#container');
  // making the pokéinfo info display
  $('#btn-info').on('click', () => {
    $container.empty();
    const $div = $('<div>').addClass('display');
    const $form = $('<form>').addClass('form');
    const $input = $('<input>')
      .attr('type', 'text')
      .attr('id', 'poke-search');
    const $btnSearch = $('<button>')
      .addClass('info-btn')
      .text('Search')
      .on('click', event => {
        event.preventDefault();
        $divImg.empty();
        $divInfo.empty();
        const $pokemon = $('#poke-search')
          .val()
          .toLowerCase();
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${$pokemon}`;
        $.ajax({ url: endpoint }).then(handleDataInfo);
        console.log($pokemon);
      });

    const $btnRandom = $('<button>')
      .addClass('info=btn')
      .text('Random')
      .on('click', () => {
        event.preventDefault();
        $divImg.empty();
        $divInfo.empty();
        const $pokemon = Math.floor(Math.random() * 808);
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${$pokemon}`;
        $.ajax({ url: endpoint }).then(handleDataInfo);
      });
    const $divImg = $('<div>').addClass('infoImage');
    const $divInfo = $('<div>').addClass('infoStats');
    $form.append($input, $btnSearch, $btnRandom, $divImg, $divInfo);
    $div.append($form);
    $container.append($div);

    const handleDataInfo = data => {
      const $sprite = $('<img>').attr('src', data.sprites.front_default);
      $('.infoImage').append($sprite);
      const $name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      let $type = ``;
      for (i = 0; i < data.types.length; i++) {
        $type += ` ${data.types[i].type.name} `;
      }
      const $info = `${$name}, the ${$type}
       pokémon. Their Pokédex number is: ${data.id}. `;
      $('.infoStats').append($info);
    };
  });
});
