'use strict';

(function($){

  //$('.three-col__img-share').append('<div class="ya-share2" data-services="vkontakte,facebook,twitter,viber,whatsapp,telegram"></div>');

  function scrollbarWidth() {
    var documentWidth = parseInt(document.documentElement.clientWidth);
    var windowsWidth = parseInt(window.innerWidth);
    var scrollbarWidth = windowsWidth - documentWidth;
    if (scrollbarWidth > 0) {
      $('.quick-view-overlay').css({marginRight: scrollbarWidth});
    }
  };
    
  function onresize() {
    console.log('onresize() called');
    if ($(document).width() > 480) {
      const baseWidth = $('.three-col__tab--active .three-col__col').outerWidth() || $('.three-col').outerWidth();        
      const remBase = parseFloat($('html').css('font-size')) * 0.625;
      const textElem = ($('.three-col__tab--active').length) ? $('.three-col__tab--active .three-col__text--bg') : $('.three-col__text--bg');
      const textElemTall = $('.three-col__text--tall');
      textElem.outerHeight( baseWidth - remBase ); 
      textElemTall.outerHeight( baseWidth  * 2 );
      resizeFont(textElem, 309.19, 18); 
    } else {
      $('.three-col__text--bg, .three-col__text--tall').removeAttr("style");  
    }

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


  //1
  function hideHeaderTitle(){
    const scrollBasis = navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/) ? 'body' : window;

    $(scrollBasis).scroll(function (){
      if ($(this).scrollTop() > 20) {
        $('.header-title').css({opacity: '0'});
      } else {
        $('.header-title').css({opacity: '1'});
      }
    });
    return false;
  };

  //2 

  function fixNav(){
    const scrollField = navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/) ? 'body' : window;
    const top = $('.header-title').outerHeight();//высота элементов перед меню
    const topNav = $('#js-header-nav').outerHeight();
    console.log(topNav);

    $(scrollField).scroll(function (){
      if ($(this).scrollTop() > top) {
        $('#js-header-nav').addClass('header-nav__container--scroll');
        $('.header__container').addClass('header__container--scroll');
        $('.three-col__row').css({paddingTop: topNav});

        // $('.three-col__container').addClass('three-col__container--scroll');

      } else {
        $('#js-header-nav').removeClass('header-nav__container--scroll');
        $('.header__container').removeClass('header__container--scroll');
        $('.three-col__row').removeAttr('style');
        // $('.three-col__container').removeClass('three-col__container--scroll');
      }
    });
    return false;
  };


  function showMore() {

    $('.three-col__text--bg').each(function(index, value){
      
      var $c = $(this);

      $c.css({overflowY: 'hidden'});

      if( !$c[0].hasOwnProperty('fullText') ){

        $c[0].fullText = $c.html();  

      }

      const charCount = $(document).width() > 480 ? 330 : 50;

      $c[0].lessText = $c[0].fullText.substr(0,  charCount ) + "...";

      if ($c[0].fullText.length > charCount) {
        $c.html($c[0].lessText).append("<a href='' class='three-col__text--more'>show more</a>");   ///class добавить!!!!!
      } else {
        $c.html($c[0].fullText);
      }

    });

  };


  $(window).on('load', function () {
    // onresize(); // !!! no active tab here 
    scrollbarWidth();
  });

  $(window).on('resize', function () {
    onresize();
    showMore();
    scrollbarWidth();
    fixNav();
    if (  $(document).width() > 480 ) {     
      $('.header-nav').removeAttr('style');
     }
  });

  $(window).on('beforeunload', function(){
    $(window).scrollTop(0);
  });
    

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
    console.log('smoothScrollTop() - called');
    return false;
  }


  /**
  * Get tab name from URL Search part and select connected tab as active
  */
  function setActiveTab(){
    //switch between home page and tabs 
    //var searchParams = new URLSearchParams(window.location.search);
    var searchParams = Utils.createUrlSearchParser(window.location.search);
    
    var targetHref = searchParams.get('t') ;

    if('scarves wall author'.indexOf( targetHref ) === -1){
      targetHref = 'author';
    }

    $('.three-col-nav__link[href*='+ targetHref +']').addClass('three-col__link--active');
    $('#'+ targetHref).addClass('three-col__tab--active');

    scrollbarWidth();

    console.log('setActiveTab() - called');

    return false;
  }


  /**
  * Init sticky button that smothly scroll top. Appears in bottom right conner.
  */
  function initStickyScrollTopBtn(){
    //scroll to top
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

  /**
  * Init all nessesery plugins
  */
  function initPlugins(){

    //stickyfill 
    Stickyfill.add( $('.three-col__title, .three-col-nav') );
    
    //quick-view
    if ($.fn.quickView) {
      $('.content').quickView(); 
      console.log('quickView initiated');
    }

  }


  function initListeners(){

    /**
    * Filter (Top search field)
    */
    $("#filter").keypress(function(event){

      // if not enter that return 
      if (event.keyCode !== 13) {return;}

      event.preventDefault();

      var filter = $(this).val();

      $(".three-col__img-wrap img").each(function(){
          const dataProductId = $(this).attr('data-product-id');
          // undefined cos there are some element that doesn't
          // have any data attribute
          if (dataProductId !== undefined){
            if(dataProductId.search(new RegExp(filter, "i")) < 0){
              $(this).parent().fadeOut();
            } else {
              $(this).parent().show();
            }
          }
        });
    });

    //redirect to home page 
    $(".content-bg, .header__row").on('click', function(e) {
      if ( e.target == $(this)[0] ) {
        var url = "index.html";
        $(location).attr('href',url);
        $("body").fadeOut(1000, redirectPage);
      }
    });

    //tabs
    $('.three-col-nav__link').on('click', function(e) {
      e.preventDefault();
      var element = $(this);
      var href = $($(this).attr('href'));
      element.addClass('three-col__link--active')
              .parent()
              .addClass('three-col-nav__item--active')
              .siblings()
              .removeClass('three-col-nav__item--active')
              .find('.three-col__link--active')
              .removeClass('three-col__link--active');
      $('.three-col__tab').not(href).removeClass('three-col__tab--active'); 
      href.addClass('three-col__tab--active');
      onresize();
      showMore();
      smoothScrollTop();
    });

    //toggle menu

    $('.header').on('click', '#js-menu-toggle', function(e) {
      e.preventDefault();
      $('.header-nav').slideToggle();
    });

    //text show more /show less approach 
    $('.three-col__text--bg').on('click', '.three-col__text--more', function(e) {
        
      e.preventDefault();
     
      $this = $(this).parent();
      
      $this.html($this[0].fullText)
              .append("<a href='' class='three-col__text--less'> show less</a>")
              .css({overflowY: 'scroll'});

    }).on('click', '.three-col__text--less', function(e) {

      e.preventDefault();

      $this =  $(this).parent();

      $this.html($this[0].lessText)
              .append("<a href='' class='three-col__text--more'> show more</a>")
              .css({overflowY: 'hidden'});
    });

  }

  /**
  * Document ready state
  */
  $( function() {

    // setActiveTab();
    
    onresize();

    showMore();

    initListeners();
    
    //hide header title
    hideHeaderTitle();

    fixNav();

    //scroll to top
    initStickyScrollTopBtn();

    initPlugins();

  });   


})(jQuery);