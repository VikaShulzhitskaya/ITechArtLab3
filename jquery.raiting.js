(function ($) {
  'use strict';

  var countOfClickedItem;
  var sumOfClickedItems;

  function make(options) {
    $('head').append('<link rel="stylesheet" href="styleForPlugin.css" type="text/css" />');
    var heightBlock = options.sizeOfElements;
    var $divElement;
    var BLOCK_DIV_CLASS_NAME = 'block';
    var STAR_ELEMENT_CLASS_NAME = 'starElement';
    var CIRCLE_ELEMENT_CLASS_NAME = 'circleElement';

    if ($(this).hasClass('stars')) {

      var widthBlock = Math.round(heightBlock * 0.88);
      var borderLR1 = Math.round(widthBlock * 0.53);
      var borderB1 = Math.round(heightBlock * 0.33);
      var borderLR2 = Math.round(widthBlock * 0.16);
      var borderB2 = Math.round(heightBlock * 0.37);

      for (var i = 1; i <= options.countOfElements; i += 1) {
        $divElement = $('<div></div>');
        $divElement.addClass(BLOCK_DIV_CLASS_NAME);
        for (var j = 1; j <= 3; j++) {
          var $starDivElement = $('<div></div>');
          $starDivElement.addClass(STAR_ELEMENT_CLASS_NAME + j);
          if (i <= options.countOfNotActiveElement) {
            $starDivElement.addClass('notActive');
          }
          $divElement.append($starDivElement);
        }
        if (options.callbackClick) {
          $divElement.on('click', {
            elementCount: i,
            colorChangeElement: 'border-bottom-color',
            countOfNotActiveElement: options.countOfNotActiveElement
          }, options.callbackClick);
        }
        if (options.callbackHover) {
          $divElement.on('mouseover', {
            elementCount: i,
            colorChangeElement: 'border-bottom-color',
            countOfNotActiveElement: options.countOfNotActiveElement
          }, options.callbackHover);
        }

        $(this).append($divElement);
      }
      var STAR_BLOCK_CLASSES = '.stars .block';

      $(STAR_BLOCK_CLASSES).css('height', heightBlock + 'px');
      $(STAR_BLOCK_CLASSES).css('width', widthBlock + 'px');

      $('.starElement1, .starElement3').css({
        'border-right-width': borderLR1 + 'px',
        'border-left-width': borderLR1 + 'px',
        'border-bottom': borderB1 + 'px solid ' + options.basicColor
      });
      $('.starElement2').css({
        'border-right-width': borderLR2 + 'px',
        'border-left-width': borderLR2 + 'px',
        'border-bottom': borderB2 + 'px solid ' + options.basicColor
      });
      $('.notActive').css({
        'border-bottom-color': options.notActiveColor
      });

    } else if ($(this).hasClass('circle')) {

      for (var i = 0; i < options.countOfElements; i += 1) {
        $divElement = $('<div></div>');
        $divElement.addClass(BLOCK_DIV_CLASS_NAME);
        var circleDivElement = $('<div></div>').addClass(CIRCLE_ELEMENT_CLASS_NAME);
        if (i <= options.countOfNotActiveElement) {
          $(circleDivElement).addClass('notActive');
        }
        $divElement.append(circleDivElement);
        if (options.callbackClick) {
          $divElement.on('click', {
            elementCount: i,
            colorChangeElement: 'background-color',
            countOfNotActiveElement: options.countOfNotActiveElement
          }, options.callbackClick);
        }
        if (options.callbackHover) {
          $divElement.on('mouseover', {
            elementCount: i,
            colorChangeElement: 'background-color',
            countOfNotActiveElement: options.countOfNotActiveElement
          }, options.callbackHover);
        }
        $(this).append($divElement);
      }

      var CIRCLE_BLOCK_CLASSES = '.circle .block';
      $(CIRCLE_BLOCK_CLASSES).css('height', heightBlock + 'px');
      $(CIRCLE_BLOCK_CLASSES).css('width', heightBlock + 'px');
      $(CIRCLE_ELEMENT_CLASS_NAME).css({
        'width': heightBlock + 'px',
        'height': heightBlock + 'px',
        'background': options.basicColor,
        'border-radius': Math.round(heightBlock / 2)
      });
      $('.notActive').css({
        'border-bottom-color': options.notActiveColor
      });

    }
  }

  function hoverElement(e) {
    var countOfNotActive = e.data.countOfNotActiveElement;
    var clickedElement = e.data.elementCount;
    var divBlock;
    if (options.readonly || (clickedElement < countOfNotActive)) {
      return;
    }

    var $parentNode = $(this).parent();
    for (var i = e.data.countOfNotActiveElement; i < clickedElement; i += 1) {
      divBlock = $parentNode.children()[i];
      $(divBlock).children().css(e.data.colorChangeElement, options.onHoverColor);
    }
    for (i = clickedElement; i < $parentNode.children().length; i += 1) {
      divBlock = $parentNode.children()[i];
      $(divBlock).children().css(e.data.colorChangeElement, options.basicColor);
    }
  }

  function clickElement(e) {
    var countOfNotActive = e.data.countOfNotActiveElement;
    var clickedElement = e.data.elementCount;
    var divBlock;
    if (options.readonly || (clickedElement < countOfNotActive)) {
      return;
    }
    var $parentNode = $(this).parent();
    for (var i = countOfNotActive; i < clickedElement; i += 1) {
      divBlock = $parentNode.children()[i];
      $(divBlock).children().css(e.data.colorChangeElement, options.activeColor);
    }
    for (i = clickedElement; i < $parentNode.childNodes.length; i += 1) {
      divBlock = $parentNode.children()[i];
      $(divBlock).children().css(e.data.colorChangeElement, options.basicColor);
    }
    countOfClickedItem += 1;
    sumOfClickedItems += clickedElement;

  }

  var options;

  var methods = {
    init: function (params) {

      options = $.extend({
        countOfElements: 5,
        sizeOfElements: 50,
        countOfNotActiveElement: 1,
        activeColor: 'red',
        notActiveColor: 'gray',
        onHoverColor: 'yellow',
        basicColor: 'blue',
        typeOfElement: 'stars',
        readonly: false,
        callbackClick: clickElement,
        callbackHover: hoverElement
      }, params);
      countOfClickedItem = 0;
      sumOfClickedItems = 0;

      return this.each(function () {
        var $this = $(this);
        make.call($this, options);
      });
    },

    averageRaiting: function () {
      return (sumOfClickedItems / countOfClickedItem).toFixed(2);
    }
  };


  jQuery.fn.raitingBlock = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      jQuery.error('Метод ' + method + ' в jQuery.raitingBlock не существует');
    }
  };

})(jQuery);