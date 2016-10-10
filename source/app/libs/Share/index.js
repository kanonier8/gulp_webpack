import {fbInit, ShareAPI} from './api';
import './sdk';


fbInit(497566147014549);

function socialShare(selector) {
	var URL = location.protocol + '//' + location.host + location.pathname;
	[].forEach.call(document.querySelectorAll('.' + selector), function(item) {
		item.addEventListener('click', shareHandler)
	});

	function shareHandler(event) {
		var shareUrl = URL;
		event.preventDefault();
		console.log('share', shareUrl);
		// when share to VKONTAKTE
		if(this.classList.contains(selector + '_vk')){
			shareUrl += '?social=vk';
			ShareAPI.vkontakte(shareUrl);
			ga_w('send', 'event', 'MechtaHozayki', 'Share', 'vk');
		// when share to FACEBOOK
		}else if(this.classList.contains(selector + '_fb')){
			ShareAPI.facebook(shareUrl,'');
			ga_w('send', 'event', 'MechtaHozayki', 'Share', 'fb');
		// when share to ODNOKLASSNIKI
		}else if(this.classList.contains(selector + '_ok')){
			shareUrl += '?social=ok';
			ShareAPI.odnoklassniki(shareUrl);
			ga_w('send', 'event', 'MechtaHozayki', 'Share', 'ok');
		}
	}
}

function ga_w(a,b,c,d,f) {
	if (typeof ga == 'function') {
		ga(a, b, c, d, f);
	} else {
	}
}

export {socialShare};