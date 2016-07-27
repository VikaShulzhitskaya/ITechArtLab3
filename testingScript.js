$(function () {
  var starRaiting = $('.raiting').raitingBlock({
    countOfElements: 5,
    sizeOfElements: 50,
    countOfNotActiveElement: 1,
    activeColor: 'red',
    notActiveColor: 'gray',
    onHoverColor: 'yellow',
    basicColor: 'blue',
    typeOfElement: 'stars',
    readonly: false,

    callbackClick: function (e) {
      alert('Click on ' + e.data.elementCount);
    }
  });
});
