const testC = ()=>{$('#testC').show();}
function testA(a) {
	$('#testA').show();
}

function testB(a) {
	$('#testB').show();
}

/* function getcookie(name) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	var expires = new Date();
	expires.setTime(expires.getTime() + seconds);
	document.cookie = escape(cookieName) + '=' + escape(cookieValue) +
		(expires ? '; expires=' + expires.toGMTString() : '') +
		(path ? '; path=' + path : '/') +
		(domain ? '; domain=' + domain : '') +
		(secure ? '; secure' : '');
} */

var resized_on_ad_loaded;

function check_ad_loaded() {

	testA();testB();testC();
	// console.log('adsbygoogle.loaded = ' + adsbygoogle.loaded);
	if (resized_on_ad_loaded) {
		return;
	}
	if (adsbygoogle.loaded) {
		$(window).trigger('resize');
		resized_on_ad_loaded = 1;
		clearTimeout();
	} else {
		setTimeout(check_ad_loaded, 200);
	}
}



var gameLazyLoad;

function lazyload() {

	$(".lazy").each(function () {
		const prefetch_height = 0;
		const win_top = $(window).scrollTop();
		const win_height = $(window).height();
		const this_top = $(this).offset().top - prefetch_height;
		const this_height = $(this).height() + prefetch_height;
		/* not (item out of window's top || item out of window's bottom) */
		if (!(win_top > this_top + this_height || win_top < this_top - win_height)) {
			if (this.tagName.toLowerCase() == 'source') {
				if (!!!$(this).attr("srcset") && !!$(this).attr("data-srcset")) {
					$(this).attr("srcset", $(this).attr("data-srcset"));
				}
			}else{
				if (!!!$(this).attr("src") && !!$(this).attr("data-srcset")) {
					$(this).attr("src", $(this).attr("data-srcset"));
				}
			}		
		}
	});
}

function userOrientation() {

	if (window.orientation == 180 || window.orientation == 0) {}
	if (window.orientation == 90 || window.orientation == -90) {}

	$(window).trigger('resize');
}


$(document).ready(function () {
	check_ad_loaded();

	$(window).trigger('resize');
	$(window).scroll(function () {
		lazyload();
		if($(window).scrollTop()>200){
			$('#backToTop').fadeIn();
		}else{
			$('#backToTop').fadeOut();
		}
	});
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", userOrientation, false);

	$('#backToTop').click(function(){
		$('html,body').animate({ scrollTop: 0 }, 350);	
	});

	$("#searchImg").click(function () {
		$("#searchDiv").toggle();
    });
    
});
$(window).resize(function () {
	lazyload();
});

function toggleMenu(){
	$('#PopMenuDiv').toggle();
}

// arena

function StartToShowAd() {
	ShowGameStats = "ad";
	$(window).trigger('resize');
	$("#adContainer").show();

	$('#ClickToPlayButton').html('<img src="/static/images/play_loader.gif" style="width:20px;">');
	$('#playad').hide();
	$('#ClickToPlayButton').hide();
	try {
		PreRollAd.start();
	} catch (err) {
		// console.log(err);
		StartToShowGame();
	}
}

function StartToShowGame() {
	ShowGameStats = "game";
	$('#ClickToPlayButton').html('<img src="/static/images/play_loader.gif" style="width:20px;">');
	$("#TheGameDiv").show();
	$("#adsContainer").hide();
	$('#ClickToPlayButton').hide();
	
	if(document.getElementById("bgsounds")){
		document.getElementById("bgsounds").play();
	}
	$(window).trigger('resize');
}
function isFullscreen() {
	return document.fullscreenElement ||
		document.mozFullScreenElement ||
		document.webkitFullscreenElement ||
		document.msFullscreenElement;
}

function toggleFullscreen(elem) {
	if (isFullscreen()) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	} else {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		}
	}
}

var test_google = 0;
function try_startad_by_google_ima3() {
	test_google += 1;
	if (test_google > 5 || !(window.google === undefined)) {
		StartToShowAd();
	} else {
		setTimeout(try_startad_by_google_ima3, 250);
	}
}
window.toggleMenu = toggleMenu;
// window.getcookie = getcookie;
// window.setcookie = setcookie;
window.StartToShowAd = StartToShowAd;
window.StartToShowGame = StartToShowGame;
window.toggleFullscreen = toggleFullscreen;