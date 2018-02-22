'use strict';

(function( $ ) {

  $("[data-fancybox]").fancybox({     
    afterShow: function() {
          var $title = $(".modal-img__title").html();
          // console.log($title);
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

})( jQuery );
























