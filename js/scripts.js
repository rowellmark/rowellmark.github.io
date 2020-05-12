( function($) {

	var app = {

		init: function(){

			this.luxy();
			this.go_to();
			this.particle();
			this.skill_bar();
			this.banner_adjust();
			this.banner_typer();
			this.fixed_header();

		

		},
		luxy : function(){
			luxy.init({
				wrapper: '#mainwrapper',
				targets : '.luxy-el',
				wrapperSpeed:  0.08
			});

		},
		go_to : function(){

			 $("a[href*='#']:not([href='#'])").click(function() {
			    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			    var target = $(this.hash);
			    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			    if (target.length) {
			      $('html,body').animate({
			        scrollTop: target.offset().top - 75
			      }, 1000);
			      return false;
			    }
			  }
			 });

		},
		fixed_header: function(){

			$(window).scroll(function() {

				if( $(this).scrollTop()  > 300 ) {
				  if (!$('.fixed-header').hasClass('fixed-nav')) {
				     $('.fixed-header').addClass('fixed-nav');
				   
				      $('.fixed-header').stop(true).animate({
				        top: 0,
				        opacity: 1
				      });

				  };

				} else {
				  if ($('.fixed-header').hasClass('fixed-nav')) {

				      $('.fixed-header').removeClass('fixed-nav');

				      $('.fixed-header').stop(true).animate({
				        top: '-100%',
				        opacity : 0
				      })        

				  };

				}
			});
		},
		banner_adjust: function(){

			windowHeight = $(window).height();

			if ($(window).width() > 992) {
				$('#hero').css({
					height: windowHeight + 'px'
				})				
			}

		},
		banner_typer : function (){

			var typed = new Typed("#hero p", {
			  strings: ["I'm a Philippines based Full-Stack Developer with over 6 years of experience focusing on crafting clean & user‑friendly experiences."],
			  typeSpeed: 20,

			});

		},
		particle: function(){
			/* ---- particles.js config ---- */

			particlesJS("particles-js", {
			  "particles": {
			    "number": {
			      "value": 120,
			      "density": {
			        "enable": true,
			        "value_area": 700
			      }
			    },
			    "color": {
			      "value": "#ffffff"
			    },
			    "shape": {
			      "type": "circle",
			      "stroke": {
			        "width": 0,
			        "color": "#ffffff"
			      },
			      "polygon": {
			        "nb_sides": 5
			      },
			      "image": {
			        "src": "img/github.svg",
			        "width": 100,
			        "height": 100
			      }
			    },
			    "opacity": {
			      "value": 0.5,
			      "random": false,
			      "anim": {
			        "enable": false,
			        "speed": 1,
			        "opacity_min": 0.1,
			        "sync": false
			      }
			    },
			    "size": {
			      "value": 3,
			      "random": true,
			      "anim": {
			        "enable": false,
			        "speed": 40,
			        "size_min": 0.1,
			        "sync": false
			      }
			    },
			    "line_linked": {
			      "enable": true,
			      "distance": 150,
			      "color": "#fda607",
			      "opacity": 0.7 ,
			      "width": 1
			    },
			    "move": {
			      "enable": true,
			      "speed": 6,
			      "direction": "none",
			      "random": false,
			      "straight": false,
			      "out_mode": "out",
			      "bounce": false,
			      "attract": {
			        "enable": false,
			        "rotateX": 600,
			        "rotateY": 1200
			      }
			    }
			  },
			  "interactivity": {
			    "detect_on": "canvas",
			    "events": {
			      "onhover": {
			        "enable": true,
			        "mode": "grab"
			      },
			      "onclick": {
			        "enable": true,
			        "mode": "push"
			      },
			      "resize": true
			    },
			    "modes": {
			      "grab": {
			        "distance": 140,
			        "line_linked": {
			          "opacity": 1
			        }
			      },
			      "bubble": {
			        "distance": 400,
			        "size": 40,
			        "duration": 2,
			        "opacity": 8,
			        "speed": 3
			      },
			      "repulse": {
			        "distance": 200,
			        "duration": 0.4
			      },
			      "push": {
			        "particles_nb": 4
			      },
			      "remove": {
			        "particles_nb": 2
			      }
			    }
			  },
			  "retina_detect": true
			});


		},
		skill_bar : function(){


		jQuery(".skills-sections").elementPeek({
		    onViewportIn: function(object) {
		        /* Show the element when it enters the viewport */
				jQuery('.skillbar').each(function(){
					jQuery(this).find('.skillbar-bar').animate({
						width:jQuery(this).attr('data-percent')
					},3000);
				});
		    },
		    peekAmountToTrigger:0.5 /* Only show the element when its top reaches the middle part of the viewport */
		});


		}

	
	}

	
	jQuery(document).ready( function() {
		
		 app.init();

		 jQuery('.hero-content .logo').addClass('active'); 
		 jQuery('#hero .hero-content h1').addClass('active');
		 jQuery('#hero .hero-content a.hire-bttn').addClass('active');
		 jQuery('#hero .hero-content .learn-more').addClass('active')
	});

	jQuery(window).on('resize', function(){
		app.banner_adjust();
	})


	jQuery(window).on('load', function(){
	
	})

})(jQuery);