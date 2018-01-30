'use strict';
;

(function($){
    
    $( function() {

      // //change modal content
      // $(function() {
      //   var modalOne = $("#modal-info-show").html();
      //   var modalTwo = $("#modal-info-hide").html();
        
      //   $('.modal-footer__submit').on('click', function(e) {
      //     $(".modal-info__content")
      //       .html(modalTwo)
      //       .addClass('modal-info__content-hide');
      //     console.log('pressed');
      //   });

      //   $('.modal-footer__submit-hide').on('click', function(e) {
      //     console.log("modalOne");
      //     $(".modal-info__content")
      //     .html(modalOne)
      //     .removeClassClass('modal-info__content-hide');
      //   });
      // });

      // hide "buy" block on open
      $("#modal-buy__btn").on('click', function(){
        $('#modal-info__content').removeClass('hidden');
      });


      //redirect to home page
      $(".content-bg, .header__row").on('click', function(e) {
        if ( e.target == $(this)[0] ) {
          var url = "index.html";
          $(location).attr('href',url);
        }
      });

      //quick-view
      $(function() {
        if ($.fn.quickView) {
            $('.content').quickView(); 
        }   
      });

      // //show conditions
      // $('.modal-footer__link').on('click', function(e) {
      //   e.preventDefault();
      //   $('.modal-hide').toggleClass('is-active');
      // });

      //stickyfill 
      var elements = $('.three-col__title, .three-col-nav');
      Stickyfill.add(elements);

      //--scroll to top 
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

        //--scroll to top ie
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