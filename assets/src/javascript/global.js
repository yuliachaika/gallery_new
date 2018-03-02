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
      console.log('onresize() width less then 480');
      const baseWidth = $('.three-col__tab--active .three-col__col').outerWidth() || $('.three-col').outerWidth();        
      const remBase = parseFloat($('html').css('font-size')) * 0.625;
      const textElem = $('.three-col__text--bg');
      console.log(`onresize() baseWidth:${baseWidth}, remBase:${remBase}`);
      const textElemTall = $('.three-col__text--tall');
      textElem.outerHeight( baseWidth - remBase ); 
      textElemTall.outerHeight( baseWidth  * 2 );
      resizeFont(textElem, 309.19, 18); 
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


  $(window).on('load', function () {
    //onresize(); // !!! no active tab here
    scrollbarWidth();
  });

  $(window).on('resize', function () {
    onresize();
    scrollbarWidth();
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
        // $(".header-title").fadeOut();

      } else{
        $("#back-top").fadeOut();
        // $(".header-title").fadeIn();
      }
    });

    $("#back-top a").click(function (){
      smoothScrollTop();
    });

    return false;
  };



//   /**
//   * Change position of sticky elements on scroll.
//   */
  function hideHeaderTitle(){

    const scrollBasis = navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/) ? 'body' : window;
      
    $(scrollBasis).scroll(function (){
      if ($(this).scrollTop() > 30){
        $(".header-title").fadeOut();
        if ($(document).width() > 480) {
          $(".header__row").css({height: '75px'});
          $(".three-col-nav").css({top: '75px'});
        } else {
          $(".header__row").css({height: '36px'});
          $(".three-col-nav").css({top: '36px'});
        }
        
      } else{
        $(".header-title").fadeIn();
        $(".header__row").css('height');
      }
    });

    return false;
  }


  /**
  * Init all nessesery plugins
  */
  function initPlugins(){
    
    //quick-view
    if ($.fn.quickView) {
      $('.content').quickView(); 
      console.log('quickView initiated');
    }

  }


  /**
  * Document ready state
  */
  $( function() {
   
    //resize text on mobile
    $('.three-col__text').on('click',  function() {
      $(this).toggleClass('three-col__text--mobile');
    });

    setActiveTab();
    
    onresize();

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

    // hide "buy" block on open
    $("#modal-buy__btn").on('click', function(){
      $('#modal-info__content').removeClass('hidden');
    });

    //redirect to home page
    $(".content-bg, .header__row").on('click', function(e) {
      if ( e.target == $(this)[0] ) {
        var url = "index.html";
        $(location).attr('href',url);
        $("body").fadeOut(1000, redirectPage);
      }
    });

 

    //stickyfill 
    var elements = $('.three-col__title, .three-col-nav');
    Stickyfill.add(elements);
    
    //hide header title
    hideHeaderTitle();


    //scroll to top
    initStickyScrollTopBtn();

     

//     $("#back-top").hide();
//       
//         $(window).scroll(function (){
//           if ($(this).scrollTop() > 100){
//             $("#back-top").fadeIn();
//           } else{
//             $("#back-top").fadeOut();
//           }
//         });

//         $("#back-top a").click(function (){
//           $("body,html").animate({
//             scrollTop:0
//           }, 800);
//           return false;
//         });

//         //scroll to top ie
//         if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/)) {
//           $("body").scroll(function (){
//             if ($(this).scrollTop() > 100){
//               $("#back-top").fadeIn();
//             } else{
//               $("#back-top").fadeOut();
//             }
//           });

//           $("#back-top a").click(function (){
//             $("body").animate({
//               scrollTop:0
//             }, 800);
//             return false;
//           });
//         }

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
      smoothScrollTop();
    });

    initPlugins();
  });   


})(jQuery);