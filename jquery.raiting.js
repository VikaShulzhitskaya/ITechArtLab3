(function ($) {
  'use strict';

  jQuery.fn.raitingPlugin = function (options) {

    var sumOfClickedItems = 0,
      countOfClickedItem = 0;
    var BLOCK_DIV_CLASS_NAME = 'block';
    var STAR_ELEMENT_CLASS_NAME = 'starElement';
    var CIRCLE_ELEMENT_CLASS_NAME = 'circleElement';
    var NOT_ACTIVE_CLASS = 'notActive';
    var context = this;
    options = $.extend({
      countOfElements: 5,
      sizeOfElements: 50,
      countOfNotActiveElement: 1,
      activeColor: 'red',
      notActiveColor: 'gray',
      onHoverColor: 'yellow',
      basicColor: 'blue',
      typeOfElement: 'star',
      readonly: false,
      callbackClick: clickElement,
      callbackHover: hoverElement

    }, options);

    function make() {
      $('head').append('<link rel="stylesheet" href="styleForPlugin.css" type="text/css" />');
      drawElements();
    }

    function drawElements() {
      var heightBlock = options.sizeOfElements;
      var $divElement;

      if (options.typeOfElement == 'star') {
        var widthBlock = Math.round(heightBlock * 0.88);
        var borderLR1 = Math.round(widthBlock * 0.53);
        var borderB1 = Math.round(heightBlock * 0.33);
        var borderLR2 = Math.round(widthBlock * 0.16);
        var borderB2 = Math.round(heightBlock * 0.37);

        for (var i = 1; i <= options.countOfElements; i++) {
          var $divElement = $('<div></div>');
          $divElement.addClass(BLOCK_DIV_CLASS_NAME);
          for (var j = 1; j <= 3; j++) {
            var $starDivElement = $('<div></div>').addClass(STAR_ELEMENT_CLASS_NAME + j);
            if (i <= options.countOfNotActiveElement) {
              $starDivElement.addClass(NOT_ACTIVE_CLASS);
            }
            $divElement.append($starDivElement);
          }
          $divElement.on('click', {
            elementCount: i,
            colorChangeElement: 'border-bottom-color'
          }, options.callbackClick);
          $divElement.on('mouseover', {
            elementCount: i,
            colorChangeElement: 'border-bottom-color'
          }, options.callbackHover);
          $(context).append($divElement);
        }

        $(context).children().css({
          'height': heightBlock + 'px',
          'width': widthBlock + 'px'
        });
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
        $(context).children().children('.notActive').css({
          'border-bottom-color': options.notActiveColor
        });

      } else if (options.typeOfElement == 'circle') {
        var circleDivElement;
        for (var i = 1; i <= options.countOfElements; i++) {
          $divElement = $('<div></div>');
          $divElement.addClass(BLOCK_DIV_CLASS_NAME);
          circleDivElement = $('<div></div>').addClass(CIRCLE_ELEMENT_CLASS_NAME);
          if (i <= options.countOfNotActiveElement) {
            $(circleDivElement).addClass(NOT_ACTIVE_CLASS);
          }
          $divElement.append(circleDivElement);
          $divElement.on('click', {
            elementCount: i,
            colorChangeElement: 'background-color'
          }, options.callbackClick);
          $divElement.on('mouseover', {
            elementCount: i,
            colorChangeElement: 'background-color'
          }, options.callbackHover);
          $(context).append($divElement);
        }
        $(context).children().css({
          'height': heightBlock + 'px',
          'width': heightBlock + 'px'
        });
        $(context).children().children().css({
          'width': heightBlock + 'px',
          'height': heightBlock + 'px',
          'background': options.basicColor,
          'border-radius': Math.round(heightBlock / 2)
        });
        $(context).children().children('.notActive').css({
          'background': options.notActiveColor
        });

      }
    }

    function hoverElement(e) {
      var countOfNotActive = options.countOfNotActiveElement;
      var clickedElement = e.data.elementCount;
      var divBlock;
      var divBlockElement = this;
      if (options.readonly || (clickedElement <= countOfNotActive)) {
        return;
      }
      var $parentNode = $(divBlockElement).parent();
      for (var i = countOfNotActive; i < clickedElement; i += 1) {
        divBlock = $parentNode.children()[i];
        
        $(divBlock).children().css(e.data.colorChangeElement, options.onHoverColor);
      }
      for (i = clickedElement; i < $parentNode.children().length; i += 1) {
        divBlock = $parentNode.children()[i];
        $(divBlock).children().css(e.data.colorChangeElement, options.basicColor);
      }
    }

    function clickElement(e) {
      var countOfNotActive = options.countOfNotActiveElement;
      var clickedElement = e.data.elementCount;
      var divBlock;
      var divBlockElement = this;
      if (options.readonly || (clickedElement <= countOfNotActive)) {
        return;
      }
      var $parentNode = $(divBlockElement).parent();
      for (var i = countOfNotActive; i < clickedElement; i += 1) {
        divBlock = $parentNode.children()[i];
        $(divBlock).children().css(e.data.colorChangeElement, options.activeColor);
      }
      for (i = clickedElement; i < $parentNode.children().length; i += 1) {
        divBlock = $parentNode.children()[i];
        $(divBlock).children().css(e.data.colorChangeElement, options.basicColor);
      }
      countOfClickedItem += 1;
      sumOfClickedItems += clickedElement;

    }

    context.each(make);

    return {
      averageRaiting: function () {
        return (sumOfClickedItems / countOfClickedItem).toFixed(2);
      }
    };
  }

})(jQuery);