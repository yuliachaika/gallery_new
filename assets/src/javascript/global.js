'use strict';

(function($){

  function acceptBuy() {

    const contentConfirm = $("#js-content-confirm").html();
    const titleConfirm = $("#js-title-confirm").html();

    $('#js-content').on('click', '#js-buy', function(e) {
      e.preventDefault();
      $('#js-content').html(contentConfirm);
      $('#js-title').html(titleConfirm);
      onresize();
    });  

  };

  function acceptConfirm() {

    const contentComplit = $("#js-content-complit").html();
    const contentOrder = $("#js-content-order").html();

    $('#js-content').on('click', '#js-confirm', function(e) {
      e.preventDefault();
      $('#js-content').html(contentComplit);
      $('#js-content-img').html(contentOrder);
      onresize();
    });  

  };

  function onresize() {

    // if ($(document).width() > 480) {
      const baseWidth = $('.three-col').outerWidth();     
      const remBase = parseFloat($('html').css('font-size')) * 0.625;
      const textElem = $('.three-col__text-wrap');
      const imgElem = $('.three-col__img-box');///
      const textElemTall = $('.three-col__text--tall');
      // textElem.outerHeight( baseWidth - remBase ); 
      textElem.outerHeight( baseWidth );
      imgElem.outerHeight( baseWidth );
      textElemTall.outerHeight( baseWidth  * 2 );
      resizeFont(textElem, 321.89, 18);
    // } else {
    //   $('.three-col__text-wrap, .three-col__text--tall').removeAttr("style");  
    // }

  };

  function resizeFont(elem, width, size) {
    var textElemWidth = elem.outerWidth();
    var scale = textElemWidth / width;
    var fontSize;
    if (scale < 1) {
      fontSize = size * scale + 'px';
      elem.css({ fontSize: fontSize});
    } else {
      fontSize = size + 'px';
      elem.css({ fontSize: fontSize});
    }
  };


  function hideHeaderTitle(){
    const scrollBasis = navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/) ? 'body' : window;
    const topHide = $('.header-title').outerHeight()/2;
    $(scrollBasis).scroll(function (){
      if ($(this).scrollTop() > topHide) {
        $('.header-title').css({opacity: '0'});
      } else {
        $('.header-title').css({opacity: '1'});
      }
    });
    return false;
  };

  function fixNav(){
    const scrollField = navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/) ? 'body' : window;
    const top = $('.header-title').outerHeight();//высота элементов перед меню
    const topNav = $('#js-header-nav').outerHeight();

    $(scrollField).scroll(function (){

      if ($(this).scrollTop() > top) {
        $('#js-header-nav').addClass('header-nav__container--scroll');
        $('.header__container').addClass('header__container--scroll');
        $('.three-col__row').css({paddingTop: topNav});
      } else {
        $('#js-header-nav').removeClass('header-nav__container--scroll');
        $('.header__container').removeClass('header__container--scroll');
        $('.three-col__row').removeAttr('style');
      }

    });
    return false;
  };


  function showMore() {

    $('.three-col__text').each(function(index, value){
      
      var $c = $(this);
      $c.css({overflowY: 'hidden'});

      if( !$c[0].hasOwnProperty('fullText') ){
        $c[0].fullText = $c.html();  
      }

      // const charCount = $(document).width() > 480 ? 330 : 50;
      const charCount = 330;

      $c[0].lessText = $c[0].fullText.substr(0,  charCount ) + "...";

      if ($c[0].fullText.length > charCount) {
        $c.html($c[0].lessText).append("<a href='' class='three-col__text--more'>show more</a>");   ///class добавить!!!!!
      } else {
        $c.html($c[0].fullText);
      }

    });

  };


  $(window).on('resize', function () {
    onresize();
    showMore();
    fixNav();
    if (  $(document).width() > 480 ) {     
      $('.header-nav').removeAttr('style');
     }
  });

  // $(window).on('beforeunload', function(){
  //   $(window).scrollTop(0);
  // });
    

  /**
  * Smooth scrolling to top position by clicking on left
  * "scroll top" button by default. Can be called manualy
  * in any place.
  */
  function smoothScrollTop(){
    //scroll to top 
    $("body,html").animate({
        scrollTop:0
    }, 800);
    // console.log('smoothScrollTop() - called');
    return false;
  };


  /**
  * Init sticky button that smothly scroll top. Appears in bottom right conner.
  */
  function initStickyScrollTopBtn(){

    $("#back-top").hide();
    
    const scrollBase = navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/) ? 'body' : window;
      
    $(scrollBase).scroll(function (){
      if ($(this).scrollTop() > 100){
        $("#back-top").fadeIn();

      } else{
        $("#back-top").fadeOut();

      }
    });

    $("#back-top a").click(function (){
      smoothScrollTop();
    });

    return false;
  };


  function initListeners(){

    //Toggle nav on mobile
    $('.header').on('click', '#js-menu-toggle', function(e) {
      e.preventDefault();
      $('.header-nav').slideToggle();
    });

    //text show more /show less approach 
    $('.three-col__text').on('click', '.three-col__text--more', function(e) {
        
      e.preventDefault();
     
      $this = $(this).parent();
      
      $this.html($this[0].fullText)
              .append("<a href='' class='three-col__text--less'> show less</a>")
              .css({overflowY: 'scroll'})
              .parent()
              .css({overflowY: 'scroll'});

      }).on('click', '.three-col__text--less', function(e) {

        e.preventDefault();

        $this =  $(this).parent();

        $this.html($this[0].lessText)
                .append("<a href='' class='three-col__text--more'> show more</a>")
                .css({overflowY: 'hidden'})
                .parent()
                .css({overflowY: 'hidden'});
      });

    };

  /**
  * Document ready state
  */
  $( function() {

    acceptBuy();

    acceptConfirm();

    onresize();

    showMore();

    initListeners();
    
    hideHeaderTitle();

    fixNav();

    initStickyScrollTopBtn();
  });   


})(jQuery);






