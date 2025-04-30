/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
	breakpoints({
		wide:      [ '961px',  '1880px' ],
		normal:    [ '961px',  '1620px' ],
		narrow:    [ '961px',  '1320px' ],
		narrower:  [ '737px',  '960px'  ],
		mobile:    [ null,     '736px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
		
		// Initialize love notes functionality
		initLoveNotes();
	});

	// Nav.
	var $nav_a = $nav.find('a');

	$nav_a
		.addClass('scrolly')
		.on('click', function(e) {
			var $this = $(this);

			// External link? Bail.
			if ($this.attr('href').charAt(0) != '#')
				return;

			// Prevent default.
			e.preventDefault();

			// Deactivate all links.
			$nav_a.removeClass('active');

			// Activate link *and* lock it
			$this
				.addClass('active')
				.addClass('active-locked');
		})
		.each(function() {
			var	$this = $(this),
				id = $this.attr('href'),
				$section = $(id);

			// No section for this link? Bail.
			if ($section.length < 1)
				return;

			// Scrollex.
			$section.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {
					// Deactivate section.
					$section.addClass('inactive');
				},
				enter: function() {
					// Activate section.
					$section.removeClass('inactive');

					// No locked links? Deactivate all links and activate this section's one.
					if ($nav_a.filter('.active-locked').length == 0) {
						$nav_a.removeClass('active');
						$this.addClass('active');
					}
					// Otherwise, if this section's link is the one that's locked, unlock it.
					else if ($this.hasClass('active-locked'))
						$this.removeClass('active-locked');
				}
			});
		});

	// Scrolly.
	$('.scrolly').scrolly();

	// Header (narrower + mobile).
	// Toggle.
	$(
		'<div id="headerToggle">' +
			'<a href="#header" class="toggle"></a>' +
		'</div>'
	).appendTo($body);

	// Header.
	$('#header')
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'left',
			target: $body,
			visibleClass: 'header-visible'
		});

	/* ===== Love Notes Functionality ===== */
	function initLoveNotes() {
		// Heart Reveal Notes
		$('.heart-note').on('click', function() {
			$(this).toggleClass('active');
			var noteId = $(this).find('.hidden-note').attr('id');
			$('#' + noteId).toggle();
		});

		// Memory Jar
		var memories = [
			"That time we stayed up until 3am talking",
			"Our adventure to [special location]",
			"When you surprised me with [thoughtful gift]",
			"The way you [specific loving action]",
			"Our first [shared experience]"
		];
		
		$('.memory-jar button').on('click', function() {
			var randomMemory = memories[Math.floor(Math.random() * memories.length)];
			$('#memory-display').html('<p>' + randomMemory + '</p>').hide().fadeIn();
		});

		// Love Letters Navigation
		var currentLetter = 0;
		var letters = $('.letter');
		
		function showLetter(index) {
			letters.removeClass('active');
			letters.eq(index).addClass('active');
		}
		
		$('.next-letter').on('click', function() {
			currentLetter = (currentLetter + 1) % letters.length;
			showLetter(currentLetter);
		});
		
		$('.prev-letter').on('click', function() {
			currentLetter = (currentLetter - 1 + letters.length) % letters.length;
			showLetter(currentLetter);
		});
		
		// Initialize first letter
		showLetter(0);

		// Secret Message
		$('#secret-message').hide();
		
		$('.secret-message button').on('click', function() {
			var inputDate = $('#date-input').val();
			var secretMessage = $('#secret-message');
			
			if(inputDate === "YOURSPECIALDATE") { // Replace with your actual special date (MMDDYYYY format)
				secretMessage.text("Your very personal secret message here!").slideDown();
			} else {
				secretMessage.text("Try again my love! The date is our anniversary (MMDDYYYY)").slideDown().delay(2000).slideUp();
			}
		});
	}

})(jQuery);

})(jQuery);
