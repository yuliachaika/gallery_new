'use strict';
;

(function($){

    $('.three-col__img-title-wrap').append('<div class="ya-share2" data-services="vkontakte,facebook,twitter,viber,whatsapp,telegram"></div>');

    

    
    // $(window).on('load', function () {
    //   //
    // //   function onresize() {
    // //     var elemHeight = $('.three-col__img-wrap').outerHeight(true);
    // //     console.log(elemHeight);
    // //     $('.three-col__text-wrap').height(elemHeight);
    // //   };

    // // onresize();
    // });
    
    $( function() {


      // //magnific-popup for big img
      // $('.modal-img-big').magnificPopup({
      //   type: 'image',
      //   closeOnContentClick: true,
      //   closeBtnInside: false,
      //   mainClass: 'mfp-with-zoom', 
      //   image: {
      //     verticalFit: true
      //   },
      //   zoom: {
      //     enabled: true,
      //     duration: 300 
      //   }
      // });


      //switch between home page and tabs 
      var searchParams = new URLSearchParams(window.location.search);
      var targetHref = searchParams.get('t');
      $('.three-col-nav__link[href*='+ targetHref +']').addClass('three-col__link--active');
      $('#'+ targetHref).addClass('three-col__tab--active');
      /////

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
        });
      });   




})(jQuery);