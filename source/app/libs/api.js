let api = {
	getVoteItems(count) {
		return `http://mechta-hozyaiki.ctc.ru/api/rating/mechta-hozyaiki/item/rand/${count}`
	},
	getAllStateContent() {
		return `http://mechta-hozyaiki.ctc.ru/api/articles/mechta-hozyaiki`
	},
	getStateContent(code) {
		return `http://mechta-hozyaiki.ctc.ru/api/article/${code}`
	},
	putLikeItem(id) {
		return  `http://mechta-hozyaiki.ctc.ru/api/rating/mechta-hozyaiki/item/${id}`
	},
	getRatingList() {
		return `http://mechta-hozyaiki.ctc.ru/api/rating/mechta-hozyaiki/item/`
	}
	
};

export {api};