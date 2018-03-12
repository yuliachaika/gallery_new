'use strict';

(function( $ ) {

  $("[data-fancybox]").fancybox({ 

    afterShow: function() {
          // var $title = $(".three-col__img-title").html();
          // var $title = $(this).parent().siblings().find(".three-col__img-title").html();
          // console.log($title);
          // $(".fancybox-image-wrap").append('<div class="fancybox__title">' + $title + 
          //   '</div>');
    },    
    clickContent : function( current, event ) {
      return 'close';
    },
    mobile : {
      dblclickContent : function( current, event ) {
        return current.type === 'image' ? 'close' : false;
      }
    }
  });

  // $('.video a').fancybox({
  //   width: 640,
  //   height: 400,
  //   type: 'iframe'
  // });

  // $(".fancybox-video").fancybox({
  //   afterShow: function() {
  //     // After the show-slide-animation has ended - play the vide in the current slide
  //     var vid = document.getElementById("myVideo"); 
  //     vid.play(); 

  //     // Attach the ended callback to trigger the fancybox.next() once the video has ended.
  //     this.content.find('video').on('ended', function() {
  //       $.fancybox.next();
  //     });
  //   }
  // });



})( jQuery );























