// Loading animation
$(window).on('load', function () {
    $('body').removeAttr('style');
    $(".loader").fadeOut("slow");
    $(".loader-wrapper").css("display", "none");
});

// Scroll Indicator Blog
$(window).scroll(function () {
    var wintop = $(window).scrollTop(), docheight =
        $(document).height(), winheight = $(window).height();
    var scrolled = (wintop / (docheight - winheight)) * 100;

    $('#scroll-line').css('width', (scrolled + '%'));
})




// Responsive navigation menu
function toggleNav() {
    $(".menu").toggleClass("close");
    $(".nav-links").toggleClass("open");
    $(".nav-links li").toggleClass("fade");
}

$(".hamburger").click(function () {
    toggleNav()
});

$("#about").click(function () {
    toggleNav()
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about-section").offset().top
    }, 500);
});
$("#work").click(function () {
    toggleNav()
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#work-section").offset().top
    }, 500);
});

$("#contact").click(function () {
    toggleNav()
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#contact-section").offset().top
    }, 500);
});


$("#aboutme").click(function () {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#about-section").offset().top
    }, 500);
});


;(function () {

    // Scroll class

    var latestKnownScrollY = window.pageYOffset || 0,
        scrollDebounce = false,
        scrollListeners = [];


    function resetScrollDebounce() {
        scrollDebounce = false;
    }

    function onScroll() {

        if (scrollDebounce) {
            return;
        }

        requestAnimationFrame(resetScrollDebounce);

        latestKnownScrollY = window.pageYOffset; // No IE8

        for (var i = scrollListeners.length - 1; i >= 0; i--) {
            scrollListeners[i]({
                latestKnownScrollY
            });
        }

        scrollDebounce = true;

    }

    window.addEventListener('scroll', onScroll, {passive: false});


    class ScrollSection {

        constructor(element, {onInView, onOutOfView, onScroll, threshold = 0}) {

            this.el = element;

            this.onInView = onInView;
            this.onOutOfView = onOutOfView;
            this.onScroll = onScroll;

            this.observer = new IntersectionObserver((e) => this.intersectionObserver(e), {
                threshold
            });
            this.observer.observe(this.el);

        }

        intersectionObserver([event]) {

            if (event.isIntersecting == true) {
                this.inView(event);
                return;
            }

            this.outOfView(event);

        }

        inView(event) {

            if (this.onInView) {
                this.onInView(event);
            }

            if (this.onScroll) {
                this.onScroll({
                    latestKnownScrollY
                });

                scrollListeners.push(this.onScroll);

            }

        }

        outOfView(event) {

            if (this.onOutOfView) {
                this.onOutOfView(event);
            }

            if (this.onScroll) {

                scrollListeners = scrollListeners.filter(item => {
                    return item != this.onScroll;
                });
            }

        }

        get relativeScrollY() {
            return latestKnownScrollY - this.el.offsetTop;
        }

    }


    // Header scrolled state
    (function () {

        var headerTrigger = document.querySelector(".header-scroll-trigger");

        if (!headerTrigger) return;

        var headerContainer = document.querySelector(".header-container");

        new ScrollSection(headerTrigger, {
            threshold: 0,
            onInView: topOfPage,
            onOutOfView: scrolled
        });


        function topOfPage() {
            headerContainer.classList.remove('scrolled');
        }

        function scrolled() {
            headerContainer.classList.add('scrolled');
        }

    })();

})();
;



// Parallax Effect
$(window).scroll(function (e) {
    parallax();
});

function parallax() {
    var scrolled = $(window).scrollTop();
    $('.help-hero').css('top', -(scrolled * 0.0315) + 'rem');
    $('.help-hero+ > h1').css('top', -(scrolled * -0.005) + 'rem');
    $('.help-hero > h1').css('opacity', 1 - (scrolled * .00175));
};





//features opening
$(document).ready(function(){

	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

    $('ul.tabs li .tab-inner-wrapper').removeClass('fill-style');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');

    $(this).find('.tab-inner-wrapper').addClass('fill-style');
    console.log(tab_id);
    console.log("#"+tab_id+' .tab-inner-wrapper');
		$("#"+tab_id+' .tab-inner-wrapper').addClass('fill-style');
	})
})

//slider testimonials
var autoslider = autoslider || {
  el: {
    slides: document.getElementsByClassName('slide')
  },

  defaultDuration: 5000,

  init: function () {
    console.log('ini');

    this.current = 0;
    this.max = this.el.slides.length - 1;
    this.timer = this.getTimerValue(this.current);
    this.next();
  },

  next: function () {
    var that = this,
        nextIndex = this.current + 1;

    if (this.current === this.max) {
      nextIndex = 0;
    }

    this.timer = this.getTimerValue(this.current);

    setTimeout(function () {
      that.changeSlide(nextIndex);
      that.current = nextIndex;
      that.next();
    }, this.timer, nextIndex);
  },

  changeSlide: function (nextIndex) {
    this.el.slides[this.current].classList.remove('active');
    this.el.slides[nextIndex].classList.add('active');
  },

  getTimerValue: function (index) {
    return this.el.slides[index].dataset.duration || this.defaultDuration;
  }
};

$(function () {
  autoslider.init();
});

//change colors in features
$(window).scroll(function() {

  // selectors
  var $window = $(window),
      $body = $('body'),
      $panel = $('.panel');

  // Change 33% earlier than scroll position so colour is there when you arrive.
  var scroll = $window.scrollTop() + ($window.height() / 3);

  $panel.each(function () {
    var $this = $(this);

    // if position is within range of this panel.
    // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
    // Remember we set the scroll to 33% earlier in scroll var.
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

      // Remove all classes on body with color-
      $body.removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
      });

      // Add class of currently active div
      $body.addClass('color-' + $(this).data('color'));
    }
  });

}).scroll();


































fff
