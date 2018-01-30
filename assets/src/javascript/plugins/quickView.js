'use strict';

const QObject = {
  itemId : 981111,
  itemSize: "&#34;52 x 52&#34;, 140 x 140 mm",
  itemFabric: "polyester",
  itemPrice: 30,
  itemUrl: "assets/dist/img/999903.jpg",
  itemBigUrl: "assets/dist/img/b/999903.jpg", //
  //itemUrl1: "<img src='assets/dist/img/999903.jpg',alt='999903' class='modal-img'>",
  init: function(target){
    
    // console.log('init class QObject');
    // this.itemId = target.dataset.productId;
    // this.itemUrl = 'assets/dist/img/b/' + target.dataset.fileName;
    return target.tagName.toLowerCase() === 'img' ? this._init(target): this._init( target.parentNode.previousElementSibling );
  },

  _init: function(target){
    console.log('init class QObject');
    this.itemId = target.dataset.productId;
    // this.itemUrl = 'assets/dist/img/b/' + target.dataset.fileName;
    this.itemBigUrl = 'assets/dist/img/b/' + target.dataset.fileName;
    this.itemUrl = 'assets/dist/img/s/' + target.dataset.fileName;
    return this;
  }
};


(function( $ ) {

    var QuickView = function( element, options ) {
        this.$element = $(element);
        this.element = element;
        this.options = options;
        this.$canvas = $(this.options.selectors.quickViewCanvas);
        this._init();
        this._stop();
    }

    QuickView.defaultOptions = {
        selectors: {
            quickViewModal: '.quick-view-modal',
            quickViewItem: '.three-col__img-wrap',
            quickViewOverlay: '.quick-view-overlay',
            quickViewCanvas: '.quick-view-canvas'
        },
        classNames: {
            active: ['is-active']
        }
    };
    
    QuickView.prototype = {
        _init: function() {
            this.$element.on('click', '.three-col__img-wrap', this._triggerHandler.bind(this));
        },
        _stop: function () {
            $(this.options.selectors.quickViewOverlay).on('click', this._overlayHandler.bind(this));
        },
        _triggerHandler: function(event) {
            this._openModal();      
        },
        _overlayHandler: function(event) {
            this._closeModal();      
        },
        _closeHandler: function(event) {
            this._closeModal();      
        },
        
        // added
        clearContent: function(){
           $(".modal-info__content").html( $("#modal-info-show").html() ); 
        },

        //change modal content
        addActionListener: function(){
            
            const that = this;

            const modalOne = $("#modal-info-show").html();
            const modalTwo = $("#modal-info-hide").html();
            
            //show conditions
            $('.modal-footer__link').on('click', function(e) {
                e.preventDefault();
                that.toggleCondition();
            });

            $('.modal-footer__submit').on('click', function() {
                
                //mail message here
                that.mail();
                that.toggleCondition(true);
                $(".modal-info__content").html(modalTwo).addClass('modal-info__content-hide');

                $('.modal-footer__submit-hide').on('click', function() {

                    $(".modal-info__content").html(modalOne).removeClass('modal-info__content-hide');
                    // update action listeners 
                    that.addActionListener(); // can be dun via parent listeners, but not in this interpretation
                    that.initData(QObject);
                });

            });            
        },
        initData: function(QObject){
            // init current object
            $('#modal__num, .modal-img__title').html(QObject.itemId);
            $('#modal__size').html('size: ' + QObject.itemSize);
            $('#modal__fabric').html('fabric: ' + QObject.itemFabric);
            $('#modal__price').html('cena: ' + QObject.itemPrice + '&#8364;');
            // $('.modal-img__wrap').html(QObject.itemUrl);
            $('.modal-img--big').attr('href',QObject.itemBigUrl); //
            $('.modal-img').attr('src',QObject.itemUrl);
            $('.modal-img__title').text(QObject.itemId);
            return false;
        },
        toggleCondition: function(remove){
            if(remove !== undefined && true){
                $('.modal-hide').removeClass('is-active');
            }else{
                $('.modal-hide').toggleClass('is-active');
            }
        },
        mail: function(){
            
            const mail = $('#modal__email').val();
            const text = $('.modal-form__area').val();
            const id = QObject.itemId;
            const data = {
                id: id,
                mail: mail,
                text: text
            };
            
            try{
                $.post('m.php', data, function(response, status, text){
                    console.log(response);
                    console.log(status);
                    console.log(text);
                });    
            }catch(exception){
                console.log(exception);
            }
            
            return;
        },
        _openModal: function() {

            /***********added**************/
            $('#modal-info__content').addClass('hidden');

            this.addActionListener();

            this.initData( QObject.init(event.target) );
           
            this._resetModal();
            $(this.options.selectors.quickViewModal)
                    .toggleClass(this.options.classNames.active
                    .join(' '));
            //var $currentProduct = $(event.target).closest(this.options.selectors.quickViewItem);
            //var $productUrl = 'assets/dist/product-data/product.json'; 

            // // init current object
            // QObject.init(event.target);
            // $('#modal__num, .modal-img__title').html(QObject.itemId);
            // $('#modal__size').html('size: ' + QObject.itemSize);
            // $('#modal__fabric').html('fabric: ' + QObject.itemFabric);
            // $('#modal__price').html('cena: ' + QObject.itemPrice + '&#8364;');
            // // $('.modal-img__wrap').html(QObject.itemUrl);
            // $('.modal-img').attr('src',QObject.itemUrl);
            // $('.modal-img__title').text(QObject.itemId);

            // this._resetModal();
            // $(this.options.selectors.quickViewModal)
            //         .toggleClass(this.options.classNames.active
            //         .join(' '));

            // $.ajax( $productUrl ).done(function(response) {
            //     $('#modal__num, .modal-img__title') 
            //     .html(response.itemId);

            //     $('#modal__size')
            //     .html('size: ' + response.itemSize);

            //     $('#modal__fabric')
            //     .html('fabric: ' + response.itemFabric);

            //     $('#modal__price')
            //     .html('cena: ' + response.itemPrice + '&#8364;');

            //     $('.modal-img__wrap')
            //     .html(response.imgUrl);

            //     this._resetModal();
            //     $(this.options.selectors.quickViewModal)
            //         .toggleClass(this.options.classNames.active
            //         .join(' '));

            // }.bind(this));

            $("html").css("overflow-y","hidden");

        },
        _closeModal: function() {
            $(this.options.selectors.quickViewModal)
                .removeClass(this.options.classNames.active
                .join(' '));

            $("html").css("overflow-y","");
            // added
            this.clearContent();
            //$(".modal-hide").hide();
            //$('.modal-hide').removeClass('is-active');
            this.toggleCondition(true);
            
            console.log('removeClassClass');
        },
        _resetModal: function() {
            this.$canvas.removeAttr("style");
        },


    } 

    $.fn.quickView = function( element, options ) {
        return this.each(function() {
            new QuickView(this, $.extend({}, QuickView.defaultOptions, options));
        });
    }; 

})( jQuery );