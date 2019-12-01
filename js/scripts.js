/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return { width: x, height: y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
 */
var waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
        if (timers[uniqueId]) { clearTimeout(timers[uniqueId]); }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 200;

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
 */
function loadGravatars() {
    // set the viewport using the function above
    viewport = updateViewportDimensions();
    // if the viewport is tablet or larger, we load in the gravatars
    if (viewport.width >= 768) {
        jQuery('.comment img[data-gravatar]').each(function() {
            jQuery(this).attr('src', jQuery(this).attr('data-gravatar'));
        });
    }
} // end function

// Toggles modal popup 
function toggleDiv(popup) {
    $("#" + popup).fadeToggle(['fast']);
}

/*
 $(document).ready(function() {
      $('select:not(.ignore)').niceSelect();      
      FastClick.attach(document.body);
    });    
 */

    // slide toggle SECTIONS
    // jQuery(document).ready(function($) {
    //     function slide() {
    //         $(".table-collapse").slideToggle("1500");
    //         return false;
    //     }
    //     $(".table-toggle").click(slide, slide);
    // });


    // jQuery(document).ready(function($) {
    //     function slide() {
    //         $(this).siblings(".section-content-wrapper").slideToggle("1500");
    //         return false;
    //     }
    //     $(".section-header").click(slide, slide);
    // });

    // jQuery(document).ready(function($) {
    //     function slide() {
    //         $(this).siblings(".data-set").slideToggle("1500");
    //         return false;
    //     }
    //     $(".data-header").click(slide, slide);
    // });

    // jQuery(document).ready(function($) {
    //     function slide() {
    //         $(this).siblings(".trends").slideToggle("1500");
    //         return false;
    //     }
    //     $(".trending-header").click(slide, slide);
    // });


    // jQuery(document).ready(function($) {
    //     function slide() {
    //         $(this).siblings(".trending-content-wrapper").slideToggle("1500");
    //         return false;
    //     }
    //     $(".trending-header").click(slide, slide);
    // });



    // jQuery(document).ready(function($) {
    //     $('select:not(.ignore)').niceSelect();      
    // });   

    // Start Ease scroll to text anchors****************************************
    // *************************************************************************
    jQuery(function($) {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 80
                    }, 750);
                    return false;
                }
            }
        })
    });

// Push Menu ****************************************
// **************************************************
jQuery(document).ready(function($){
    
    var $lateral_menu_trigger = $('.cms-menu-trigger');
    var $content_wrapper = $('.cms-main-content');
    var $navigation = $('header');

    $lateral_menu_trigger.click(function(event){
        event.preventDefault();

        $lateral_menu_trigger.toggleClass('is-clicked');
        $navigation.toggleClass('lateral-menu-is-open');
        $content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
            $('body').toggleClass('overflow-hidden');
        });
        $('#cms-lateral-nav').toggleClass('lateral-menu-is-open');

        // check if transitions are not supported - i.e. in IE9
        if($('html').hasClass('no-csstransitions')) {
            $('body').toggleClass('overflow-hidden');
        }
    });

    // close lateral menu clicking outside the menu itself
    $content_wrapper.click(function(event){
        if( !$(event.target).is('.cms-menu-trigger, .cms-menu-trigger span') ) {
            $lateral_menu_trigger.removeClass('is-clicked');
            $navigation.removeClass('lateral-menu-is-open');
            $content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
            $('#cms-lateral-nav').removeClass('lateral-menu-is-open');
            //check if transitions are not supported
            if($('html').hasClass('no-csstransitions')) {
                $('body').removeClass('overflow-hidden');
            }

        }
    });
});

// Floating Action Button JS ************************
// **************************************************

jQuery(document).ready(function($){  
  
    $(".fab,.backdrop").click(function(){        
        if($(".backdrop").is(":visible")){            
            $(".backdrop").fadeOut(125);            
            $(".fab.child")                
            .stop()                
            .animate({                    
                bottom  : $("#masterfab").css("bottom"),                    
                opacity : 0                
            },125,function(){                    
                $(this).hide();                
            });        
        }else{            
            $(".backdrop").fadeIn(125);            
        $(".fab.child").each(function(){                
            $(this)                    
        .stop()                    
        .show()                    
        .animate({                        
            bottom  : (parseInt($("#masterfab").css("bottom")) + parseInt($("#masterfab").outerHeight()) + 60 * $(this).data("subitem") - $(".fab.child").outerHeight()) + "px",                        
        opacity : 1                    
    },125);            
    });        
    }    
});
});

// File Upload **************************************
// **************************************************

jQuery(document).ready(function($){

    $("#upload_link").on('click', function(e){
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });
});

// Slide Panel **************************************
// **************************************************
jQuery(document).ready(function($){

    $(".show-panel").click(function(){
        $(".panel-wrapper").slideToggle("slow");
    });
});

// Video background *********************************
// **************************************************


// Add to cart **************************************
// **************************************************
jQuery(document).ready(function($){
    var cartWrapper = $('.cms-cart-container');
    var productId = 0;

    if( cartWrapper.length > 0 ) {
        //store jQuery objects
        var cartBody = cartWrapper.find('.body');
        var cartList = cartBody.find('ul').eq(0);
        var cartTrigger = cartWrapper.children('.cms-cart-trigger');
        var cartCount = cartTrigger.children('.count');
        var cartTrigger2 = cartWrapper.children('.cms-cart-trigger2');
        var cartCount2 = cartTrigger2.children('.count');
        var addToCartBtn = $('.cms-add-to-cart');

        //add product to cart
        addToCartBtn.on('click', function(event){
            event.preventDefault();
            addToCart($(this));
            cartCount.show(50);
            cartCount2.show(50);
        });

        //update item quantity
        cartList.on('change', 'select', function(event){
            quickUpdateCart();
        });
    }

    function addToCart(trigger) {
        var cartIsEmpty = cartWrapper.hasClass('empty');
        updateCartCount(cartIsEmpty);
        cartWrapper.removeClass('empty');
    }

    function updateCartCount(emptyCart, quantity) {
        if( typeof quantity === 'undefined' ) {
            var actual = Number(cartCount.find('li').eq(0).text()) + 1;
            var next = actual + 1;
            
            if( emptyCart ) {
                cartCount.find('li').eq(0).text(actual);
                cartCount.find('li').eq(1).text(next);
            } else {
                cartCount.addClass('update-count');

                setTimeout(function() {
                    cartCount.find('li').eq(0).text(actual);
                }, 150);

                setTimeout(function() {
                    cartCount.removeClass('update-count');
                }, 200);

                setTimeout(function() {
                    cartCount.find('li').eq(1).text(next);
                }, 230);
            }
        }

        if( typeof quantity === 'undefined' ) {
            var actual = Number(cartCount2.find('li').eq(0).text()) + 1;
            var next = actual + 1;
            
            if( emptyCart ) {
                cartCount2.find('li').eq(0).text(actual);
                cartCount2.find('li').eq(1).text(next);
            } else {
                cartCount2.addClass('update-count');

                setTimeout(function() {
                    cartCount2.find('li').eq(0).text(actual);
                }, 150);

                setTimeout(function() {
                    cartCount2.removeClass('update-count');
                }, 200);

                setTimeout(function() {
                    cartCount2.find('li').eq(1).text(next);
                }, 230);
            }
        } 

        else {
            var actual = Number(cartCount.find('li').eq(0).text()) + quantity;
            var actual2 = Number(cartCount2.find('li').eq(0).text()) + quantity;
            var next = actual + 1;
            var next2 = actual2 + 1;
            
            cartCount.find('li').eq(0).text(actual);
            cartCount.find('li').eq(1).text(next);
            cartCount2.find('li').eq(0).text(actual2);
            cartCount2.find('li').eq(1).text(next2);
        }
    }

    // function updateCartTotal(price, bool) {
    //     bool ? cartTotal.text( (Number(cartTotal.text()) + Number(price)).toFixed(2) )  : cartTotal.text( (Number(cartTotal.text()) - Number(price)).toFixed(2) );
    // }
});
