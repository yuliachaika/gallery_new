'use strict';

(function( $ ) {

  $("[data-fancybox]").fancybox({ 
    // fitToView: false, //
    // afterLoad: function () {
    //     this.width = 1000;
    //     this.height = 1000;
    // },    
    // preload : false,//
    // beforeshow: function() {
    //   $(".fancybox-image-wrap").css({"transform": "translate(180px, -44.946px) scale(1, 1)", "width": "1100px", "height": "1100px"});
    // },
    afterShow: function() {
          var $title = $(".modal-img__title").html();
          console.log($title);
          $(".fancybox-image-wrap").append('<div class="fancybox__title">' + $title + 
            '</div>');
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

  $('.video a').fancybox({
    width: 640,
    height: 400,
    type: 'iframe'
  });

  $(".fancybox-video").fancybox({
    afterShow: function() {
      // After the show-slide-animation has ended - play the vide in the current slide
      var vid = document.getElementById("myVideo"); 
      vid.play(); 

      // Attach the ended callback to trigger the fancybox.next() once the video has ended.
      this.content.find('video').on('ended', function() {
        $.fancybox.next();
      });
    }
  });


  // $(".fancybox-single").fancybox({
    
  //   afterShow: function() {
  //     // After the show-slide-animation has ended - play the video
  //     this.content.find('video').trigger('play');
  //     // this.content.find('video').play();


  //     // Trigger fancybox.close() once the video has ended
  //     this.content.find('video').on('ended', function() {
  //       $.fancybox.close();
  //     });
  //   }
      
  // });

  // //$('.fancybox-second').click(function(e) {
  //   e.preventDefault();

  //   $.fancybox.open({
  //     content: '<video id="video" width="' + $(this).attr('data-width') +
  //     '" height="' + $(this).attr('data-height') +
  //     '" preload="auto" controls="controls" autoplay="autoplay"><source src="'
  //     + $(this).attr('href') + '" type="video/mp4" /><div>Your browser does not support the HTML5 video tag.</div></video>',
  //     afterShow: function() {
  //   //     // do this for the dynamically loaded video
  //   //    // this.content.find('video').trigger('play');
  //     this.content.find('video').play();


  //    this.content.find('video').on('ended', function() {
  //       $.fancybox.close();
  //     });

  //     }
  //   });

  // });


})( jQuery );



//<div class="fancybox-image-wrap" style="transform: translate(730px, -344.946px) scale(1, 1); width: 1100px; height: 1100px;">




















