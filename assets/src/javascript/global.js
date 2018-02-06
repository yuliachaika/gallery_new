'use strict';
;

(function($){

  $('.three-col__img-title-wrap').append('<div class="ya-share2" data-services="vkontakte,facebook,twitter,viber,whatsapp,telegram"></div>');

  function scrollbarWidth() {
    var documentWidth = parseInt(document.documentElement.clientWidth);
    var windowsWidth = parseInt(window.innerWidth);
    var scrollbarWidth = windowsWidth - documentWidth;
    console.log(scrollbarWidth);
    if (scrollbarWidth > 0) {
      $('.quick-view-overlay').css({marginRight: scrollbarWidth});
    }
  };
    
    function onresize() {
      var elem = $('.three-col__img-wrap');
      var elemHeight = elem.outerHeight(true);
      var textElem = $('.three-col__text--bg');
      var textElemTall = $('.three-col__text--tall');
      textElem.outerHeight(elemHeight);
      textElemTall.outerHeight((2*elemHeight)); 
      resizeFont(textElem, 309.19, 18); 
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
      onresize();
      scrollbarWidth();
    });

    $(window).on('resize', function () {
      onresize();
      scrollbarWidth();
    });

    $(window).on('beforeunload', function(){
        $(window).scrollTop(0);
    });
    
    $( function() {
      // scrollbarWidth();
      // onresize();
      //switch between home page and tabs 
      var searchParams = new URLSearchParams(window.location.search);
      var targetHref = searchParams.get('t');
      $('.three-col-nav__link[href*='+ targetHref +']').addClass('three-col__link--active');
      $('#'+ targetHref).addClass('three-col__tab--active');

      scrollbarWidth();

      //filter
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

      //quick-view
      $(function() {
        if ($.fn.quickView) {
          $('.content').quickView(); 
        }   
      });

      //stickyfill 
      var elements = $('.three-col__title, .three-col-nav');
            Stickyfill.add(elements);

      //scroll to top 
            $("#back-top").hide();
            
              $(window).scroll(function (){
                  if ($(this).scrollTop() > 100){
                      $("#back-top").fadeIn();
                  } else{
                      $("#back-top").fadeOut();
                  }
              });

              $("#back-top a").click(function (){
                  $("body,html").animate({
                      scrollTop:0
                  }, 800);
                  return false;
              });

        //scroll to top ie
        if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident.*rv:/)) {
            $("body").scroll(function (){
                if ($(this).scrollTop() > 100){
                    $("#back-top").fadeIn();
                } else{
                    $("#back-top").fadeOut();
                }
            });

            $("#back-top a").click(function (){
                $("body").animate({
                    scrollTop:0
                }, 800);
                return false;
            });
        }

      //tabs
      $('.three-col-nav__link').on('click', function(e) {
        e.preventDefault();
        var element = $(this);
        var href = $($(this).attr('href'));
        element
        .addClass('three-col__link--active')
        .parent()
        .addClass('three-col-nav__item--active')
        .siblings()
        .removeClass('three-col-nav__item--active')
        .find('.three-col__link--active')
        .removeClass('three-col__link--active');
        $('.three-col__tab')
        .not(href)
        .removeClass('three-col__tab--active'); 
        href.addClass('three-col__tab--active');
        onresize();
      });
    });   




  })(jQuery);