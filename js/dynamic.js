function videoBg() {
	var ratio = 852/480;
	var w = $('.wrapper').width();
	var h = $(window).height();
	if (  w/h > ratio ) {
		$('.bg video').css({
			'left': '0',
			'top': -(w/852*480-h)*0.5+'px',
			'-webkit-transform': 'scale('+w/852+')',
			'-webkit-transform-origin': 'left top',
			'-moz-transform': 'scale('+w/852+')',
			'-moz-transform-origin': 'left top',
			'transform': 'scale('+w/852+')',
			'transform-origin': 'left top'
		});
	}
	else {
		$('.bg video').css({
			'left': -(h/480*852-w)*0.5+'px',
			'top': '0',
			'-webkit-transform': 'scale('+h/480+')',
			'-webkit-transform-origin': 'left top',
			'-moz-transform': 'scale('+h/480+')',
			'-moz-transform-origin': 'left top',
			'transform': 'scale('+h/480+')',
			'transform-origin': 'left top'
		});
	}
}
function menuMinHeight() {
	$('.menu').css({
		'min-height': $('.wrapper').outerHeight()+'px'
	});
}
$(document).ready(function() {
	if ( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('desktop');
		$('body').append('<div class="bg"><video width="852" height="480" poster="./media/video.jpg" autoplay loop><source src="./media/video.mp4" type="video/mp4"><source src="./media/video.webm" type="video/webm"></video></div>');
		videoBg();
	}
	else {
		$('body').addClass('mobile');
		var phone = $('.main > div p span').html();
		$('.main > div p span').html('<a href="tel:+7945369330">'+phone+'</a>');
	}
	if ( $('.menu').length > 0 ) {
		$('.menu').css({
			'left': -$('.menu').outerWidth()+'px'
		});
		menuMinHeight();
	}
	$('.open').bind('click', function(event) {
		$('.menu').stop().animate({
			'left': '0'
		}, 400);
		$(this).stop().fadeOut(400);
		event.preventDefault();
	});
	$('.menu .close').bind('click', function(event) {
		$('.menu').stop().animate({
			'left': -$('.menu').outerWidth()+'px'
		}, 400);
		$('.open').stop().fadeIn(400);
		event.preventDefault();
	});
	$('.menu > ul > li > ul').parent().children('a').bind('click', function(event) {
		var t = $(this).parent();
		t.children('ul').stop().slideToggle(200);
		event.preventDefault();
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
});
$(window).resize(function() {
	if ( $('.menu').length > 0 ) {
		menuMinHeight();
	}
	if ( $('.mobile').length > 0 && $('.menu').offset().left < 0 ) {
		$('.menu').css({
			'left': -$('.wrapper').width()+'px'
		});
	}
	if ( $('.bg').length > 0 ) {
		videoBg();
	}
});