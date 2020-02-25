/*
 * jquery.elementpeek.js v1.0.4
 *
 * Description: Run code whenever an element enters or exit the viewport
 * Extensions: aiLazy, 
 * Copyright: http://www.agentimage.com
 * License: Proprietary
 */


( function() {
	
	jQuery.fn.elementPeek = function (settings) {
		ElementPeek( jQuery(this), settings );
	}
	
	function ElementPeek(object,settings) {
			
		var targetObject = jQuery(object);
		
		var defaults = {
			onViewportIn: function() {},
			onViewportOut: function() {},
			peekAmountToTrigger:0.5
		}
		
		settings = jQuery.extend(defaults,settings);
		
		function _construct() {
			
			targetObject.each( function(i,v) {
				
				onElementInvisible(jQuery(v));
				
				runAnimation(jQuery(v));
				jQuery(window)
					.on('scroll', function() {
						runAnimation(jQuery(v));
					})
					.resize( function() {
						runAnimation(jQuery(v));
					});
					
				jQuery(window).on('load', function() {
					jQuery(window).trigger('resize');
				});
				
			});
			
		}
		
		function runAnimation(object) {
			
			if ( isElementVisible(object) ) {
				onElementVisible(object);
			}
			
			else {
				onElementInvisible(object);
			}
			
		}
		
		function onElementVisible(object) {
			
			if ( !object.hasClass("visible") ) {
				settings.onViewportIn.call(this,object);
				object.addClass("visible");
			}
			
		}
		
		function onElementInvisible(object) {
			
			if ( object.hasClass("visible") ) {
				settings.onViewportOut.call(this,object);
				object.removeClass("visible");
			}
			
		}
		
		function isElementVisible(object) {
			
			var offset = object.offset();
			var objectHeight = object.height();
			var winHeight = jQuery(window).height();
			var scrollTop = jQuery(window).scrollTop();
			var triggerStart = scrollTop + (winHeight - ( winHeight * settings.peekAmountToTrigger ));
			var triggerEnd = 	offset.top 
								+ objectHeight 
								+ parseInt( object.css("padding-top") ) 
								+ parseInt( object.css("padding-bottom") )
								+ parseInt( object.css("margin-top") )
								+ parseInt( object.css("margin-bottom") );
			
			if ( offset.top < triggerStart && scrollTop < triggerEnd) {
				return true;
			}
			
			return false;
			
		}
		
		_construct();
		
	}


	var EPextensions = {

		defaults: {
			epLazyAnimation: 'fadeIn',
			epLazyOffset: '0.3' 
		},

		init: function() {
			this.EP_lazy.init();
			this.EP_scroll_animation.init();
		},

		EP_lazy:  {

			init: function() {

				jQuery.fn.aiLazy = function (settings) {
					EPextensions.EP_lazy.aiLazyFunction( jQuery(this), settings );
				}

				jQuery('.ai-lazy').each( function(){ 

					custom_class = jQuery(this).data('class') != "" ? jQuery(this).data('class') : "";
					custom_animation = jQuery(this).data('animation') != "" ? jQuery(this).data('animation') : EPextensions.defaults.epLazyAnimation;
					custom_offset = jQuery(this).data('offset') != "" ? jQuery(this).data('offset') : EPextensions.defaults.epLazyOffset;

					jQuery(this).aiLazy({
						class: custom_class,
						animation: custom_animation,
						peekAmount: custom_offset,
					});

				});


			},

			aiLazyFunction: function( object,settings ) {

				var targetObject = jQuery(object);

				if ( targetObject.prop("nodeName") == 'IMG' ) {
					targetObject.attr('src','data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==')
				}

				var defaults = {
					class: '',
					animation: EPextensions.defaults.epLazyAnimation,
					peekAmount: EPextensions.defaults.epLazyOffset
				}
				
				settings = jQuery.extend(defaults,settings);

				targetObject.elementPeek({
				    onViewportIn: function(object) {
				        obj_src = object.data('src');
				        if ( object.prop("nodeName") == 'IMG' ) {
				        	object.attr('src', obj_src).addClass('ai-lazy-loaded animated ' + settings.animation).addClass( settings.class );
				        } else if ( object.prop("nodeName") == 'CANVAS' ) {
							object.css({
								'background-image': 'url('+obj_src+')'
							}).addClass('ai-lazy-loaded animated ' + settings.animation).addClass( settings.class );
				        }
				    },

				    peekAmountToTrigger: settings.peekAmount
				});

			}

		},

		EP_scroll_animation: {

			init: function() {
				EPextensions.EP_scroll_animation.onScrollInit( jQuery( '*[data-aios-reveal="true"]' ) );
				EPextensions.EP_scroll_animation.onScrollStaggeredInit( jQuery( '*[data-aios-staggered-parent="true"]' ) );
			},
			onScrollInit: function( items ) {
				items.each( function(i,v) {
					var bsElement = jQuery( v ),
						bsAnimationClass = ( bsElement.attr('data-aios-animation') != '' ? bsElement.attr('data-aios-animation') : 'fadeIn' ),
						bsAnimationDelay = ( bsElement.attr('data-aios-animation-delay') != '' ? bsElement.attr('data-aios-animation-delay') : '0s' ),
						bsAnimationReset = ( bsElement.attr('data-aios-animation-reset') != '' ? bsElement.attr('data-aios-animation-reset') : false ),
						bsAnimationOffset = ( bsElement.attr('data-aios-animation-offset') != '' ? bsElement.attr('data-aios-animation-offset') : '0.3' );
					  
					bsElement.css( {
						'-webkit-animation-delay':  bsAnimationDelay,
						'-moz-animation-delay':     bsAnimationDelay,
						'animation-delay':          bsAnimationDelay
					} );

					var bsTrigger = bsElement;

					if ( bsAnimationReset == 'true' ) {
						bsTrigger.elementPeek({
							onViewportIn: function( object ) {
								bsElement.addClass('animated').addClass( bsAnimationClass );
							},
							onViewportOut: function( object ) {
								bsElement.removeClass('animated').removeClass( bsAnimationClass );
							},
							peekAmountToTrigger: bsAnimationOffset
						});
					} else {
						bsTrigger.elementPeek({
							onViewportIn: function( object ) {
								bsElement.addClass('animated').addClass( bsAnimationClass );
							},
							peekAmountToTrigger: bsAnimationOffset
						});
					}
				});

			},

			onScrollStaggeredInit: function( items ) {
				items.each( function(i,v) {
					var bsParent = jQuery( v ),
						bsElement = jQuery( v ).find( '[data-aios-staggered-child="true"]' ),
						bsAnimationOffset = ( bsParent.attr('data-aios-animation-offset') != '' ? bsParent.attr('data-aios-animation-offset') : '0.3' )
						bsAnimationReset = ( bsParent.attr('data-aios-animation-reset') != '' ? bsParent.attr('data-aios-animation-reset') : false );

					var bsTrigger = bsParent;

					if ( bsAnimationReset == 'true' ) {
						bsTrigger.elementPeek({
							onViewportIn: function( object ) {
								EPextensions.EP_scroll_animation.aiosDoAnimation( bsElement, false );
							},
							onViewportOut: function( object ) {
								EPextensions.EP_scroll_animation.aiosDoAnimation( bsElement, true );
							},
							peekAmountToTrigger: bsAnimationOffset
						});
					} else {
						bsTrigger.elementPeek({
							onViewportIn: function( object ) {
								EPextensions.EP_scroll_animation.aiosDoAnimation( bsElement, false );
							},
							peekAmountToTrigger: bsAnimationOffset
						});
					}

					

				});
			},

			aiosDoAnimation: function( element, reset ) {
				element.each( function( i,v ) {
					var cElement = jQuery( v ),
						bsAnimationClass = ( cElement.attr('data-aios-animation') != '' ? cElement.attr('data-aios-animation') : 'fadeIn' ),
						bsAnimationDelay = ( cElement.attr('data-aios-animation-delay') != '' ? cElement.attr('data-aios-animation-delay') : '0s' );

					cElement.css( {
						'-webkit-animation-delay':  bsAnimationDelay,
						'-moz-animation-delay':     bsAnimationDelay,
						'animation-delay':          bsAnimationDelay
					} );

					if ( reset == true ) {
						cElement.removeClass('animated').removeClass( bsAnimationClass );
					} else {
						cElement.addClass('animated').addClass( bsAnimationClass );
					}
				} );
			}

		}

	}

	jQuery(document).ready(function(){
		EPextensions.init();
	});
	
})();