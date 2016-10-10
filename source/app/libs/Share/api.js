function fbInit(fbID) {
	window.fbAsyncInit = function() {
		FB.init({
			appId: fbID,
			xfbml: true,
			version: 'v2.5'
		});
	};
}

let url;
let  ShareAPI = {
	vkontakte: function (purl) {
		url = 'https://vk.com/share.php?';
		url += 'url=' + encodeURIComponent(purl);

		window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
	},
	odnoklassniki: function (purl) {
		url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		url += '&st._surl=' + encodeURIComponent(purl);
		window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
	},
	facebook: function (purl,desc) {
		//purl = encodeURIComponent(purl);
		if(typeof(desc)=='undefined'){
			desc='';
		}
		FB.ui({
			method: 'feed',
			link: purl,
			/*caption: desc,*/
			description: desc
		}, function(response){});

	}
};

export {fbInit};
export {ShareAPI};