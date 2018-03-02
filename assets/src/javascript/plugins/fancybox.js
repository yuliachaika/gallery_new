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

})( jQuery );



//<div class="fancybox-image-wrap" style="transform: translate(730px, -344.946px) scale(1, 1); width: 1100px; height: 1100px;">




















