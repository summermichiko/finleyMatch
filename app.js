$(document).ready(function() {
	var app = $(".finleyMatch"),
		finleyGame = $(".finleyGame"),
		images = [
			'finley1.jpg', 'finley1.jpg',
			'finley2.jpg', 'finley2.jpg',
			'finley3.jpg', 'finley3.jpg',
			'chumley1.jpg', 'chumley1.jpg',
			'chumley2.jpg', 'chumley2.jpg',
			'chumley3.jpg', 'chumley3.jpg'
		],
		circleUrls = [],
		circleIds = [],
		flipped,
		htmlString,
		helper = {
			shuffle: function(array) {
				for (var i = 0; i < array.length; i++) {
					var randomIndex = Math.floor(Math.random()*(i+1)),
						circleAtIndex = array[randomIndex];
						array[randomIndex] = array[i];
						array[i] = circleAtIndex;
				}
				return array;
			},
			resetArrays: function() {
				circleUrls = [];
				circleIds = [];
			},
			flipBackOver: function() {
				var circle1 = finleyGame.find('#' + circleIds[0]),
					circle2 = finleyGame.find('#' + circleIds[1]);
					circle1.attr('src', '');
					circle2.attr('src', '');
					helper.resetArrays();
			},
			flipCircle: function(circle, imageString) {
				var circleId = circle.attr('id');

				if ((circle.attr('src') === '') && (circleUrls.length < 2)) {
					circle.attr('src', 'assets/' + imageString);

					// if no circles are flipped over
					if (circleUrls.length === 0) {
						circleUrls.push(imageString);
						circleIds.push(circleId);

					// if one circle is flipped over
					} else if (circleUrls.length === 1) {
						circleUrls.push(imageString);
						circleIds.push(circleId);

						// if both circles are a match
						if (circleUrls[0] == circleUrls[1]) {
							flipped += 2;
							helper.resetArrays();

							// if all circles are flipped
							if (flipped == images.length) {
								$('#finleyModal').modal({
									backdrop: 'static',
									keyboard: false
								});
							}
						} else {
							setTimeout(helper.flipBackOver, 700);
						}
					}
				}
			},
			setNewGame: function() {
				flipped = 0;
				htmlString = '';
				helper.shuffle(images);
				for (var i = 0; i < images.length; i++) {
					if ((i === 0 || i === 4 || i === 8) && ($(window).width() > 767)) {
						htmlString +=
							'<div class="col-sm-2 col-xs-6 col-sm-offset-2 col-xs-offset-0">' +
								'<div class="circleWrapper" id="circle' + i + '">' +
									'<div class="circle">' +
										'<div class="circleFace front">&nbsp;</div>' +
										'<div class="circleFace back">' +
											'<img id="circle' + i + '" src="assets/' + images[i] + '">' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';
					} else {
						htmlString +=
							'<div class="col-sm-2 col-xs-6">' +
								'<div class="circleWrapper" id="circle' + i + '">' +
									'<div class="circle">' +
										'<div class="circleFace front">&nbsp;</div>' +
										'<div class="circleFace back">' +
											'<img id="circle' + i + '" src="assets/' + images[i] + '">' +
										'</div>' +
									'</div>' +
								'</div>' +
							'</div>';
					}
				}
				finleyGame.empty().append(htmlString);
			}
		};

	helper.setNewGame();

	finleyGame.on('click', '.circleWrapper', function() {
		// var circleId = $(this).attr('id');
		// helper.flipCircle($(this), imageString);
        $(this).find('.circle').toggleClass('flipped');

	});

	app.on('click', '.arrowImg', function() {
		$('html, body').animate({
			scrollTop: $(".gameWrapper").offset().top
		}, 600);
	});

	app.on('click', '.playNow', function() {
		$('html, body').animate({
			scrollTop: $(".gameWrapper").offset().top
		}, 600);
	});

	app.on('click', '.playAgainButton', function() {
		$('#finleyModal').modal('hide');
		helper.setNewGame();
	});

	app.on('click', '.toPortfolio', function() {
		window.open('http://summermcdonald.me/', '_blank');
	});
});