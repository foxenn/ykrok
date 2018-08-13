$(document).ready(function() {
  $('body').fadeIn(3000);
  var owl = $('.owl-carouselzero');
  owl.owlCarousel({
    margin: 15,
    nav: false,
    loop: true,
    autoplayTimeout: 800,
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  })

  var owlone = $('.owl-carouselone');
  owlone.owlCarousel({
    margin: 15,
    nav: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  })
  var owlone = $('.owl-carousel-testimonial');
  owlone.owlCarousel({
    margin: 15,
    nav: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    slideTransition: 'ease-in-out',
    autoplayHoverPause:true,
    smartSpeed: 500,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  })
  $(document).scroll(function() {
    var scroll = $(this).scrollTop();
    if (scroll >= 150) {
      $("#popUp").css("margin-right", "0px");
      $("#plus").css("margin-right", "-425px");
    } else {
      $("#popUp").css("margin-right", "-425px");
      $("#plus").css("margin-right", "0px");
    }
  });

  $("#plus").click(function() {
    $("#popUp").css("margin-right", "0px");
    $("#plus").css("margin-right", "-425px");
    $('#pop_up_cvr').removeClass('force_stay_pop');
  });

  $("#close").click(function() {
    $("#popUp").css("margin-right", "-425px");
    $("#plus").css("margin-right", "0px");
    $('#pop_up_cvr').addClass('force_stay_pop');
  });

  $('.portal-trigger1').click(function(){
    return $('.top-portal-list1').hasClass('open') ? $('.top-portal-list1').removeClass('open') : $('.top-portal-list1').addClass('open');
  })
})

            
        