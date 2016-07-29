$(function () {
  var starRaiting = $('.raiting').raitingPlugin({
    countOfElements: 5,
    sizeOfElements: 50,
    countOfNotActiveElement: 1,
    activeColor: 'red',
    notActiveColor: 'gray',
    onHoverColor: 'yellow',
    basicColor: 'blue',
    typeOfElement: 'circle',
    readonly: false,

  });

  $('#average').click(function () {
    alert(starRaiting.averageRaiting());

  });