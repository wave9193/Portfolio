/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

    		$(document).ready(function() {
				const workContainer = $('#work-container');
				const articles = workContainer.children('.work-item');
				const articlesPerRow = 2;
		
				// Calculate the total number of rows and rows to initially show
				const totalRows = Math.ceil(articles.length / articlesPerRow);
				const initialRows = 2;
		
				$('#more-button').on('click', function(event) {
					event.preventDefault();
		
					const isExpanded = $(this).text() === 'Less';
		
					articles.each(function(index) {
						const currentRow = Math.floor(index / articlesPerRow) + 1;
						if (currentRow > initialRows) {
							$(this).toggle(!isExpanded ? 'slow' : 'slow');
						}
					});
		
					$(this).text(isExpanded ? 'More' : 'Less');
		
					if (!isExpanded) {
						// Scroll down to the bottom of the container when expanding
						const containerBottom = workContainer.offset().top + workContainer.outerHeight();
						const windowHeight = $(window).height();
		
						$('html, body').animate({ scrollTop: containerBottom - windowHeight }, 'slow');
					} else {
						// Scroll to the center of the container when collapsing
						const workContainerTop = workContainer.offset().top;
						const workContainerHeight = workContainer.outerHeight();
						const windowHeight = $(window).height();
						const centerPosition = workContainerTop + (workContainerHeight / 2) - (windowHeight / 2);
		
						$('html, body').animate({ scrollTop: centerPosition }, 'slow');
					}
				});
			});
		

})(jQuery);