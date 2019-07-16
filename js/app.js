console.log('linked');
$(() => {
  const $container = $('#container');
  //   C O D E
  $('#btn-info').on('click', () => {
    const $div = $('<div>').addClass('display');
    const $form = $('<form>').addClass('form');
    const $input = $('<input>').attr('type', 'text');
    const $btnSearch = $('<button>')
      .addClass('info-btn')
      .text('Search');
    const $btnRandom = $('<button>')
      .addClass('info=btn')
      .text('Random');
    $form.append($input, $btnSearch, $btnRandom);
    $div.append($form);
    $container.append($div);
  });
});
