export default class FreeBoardSearchOption {
	#startDate = null;
	#endDate = null;
	#category = 0;
	#query = null;
	#allCount = 0;
	#perRange = 0;
	#perPage = 0;
	#currentPage = 0;
	#startPage = 0;
	#endPage = 0;
	#maxPage = 0;


	/**
	 * @param {string | null} startDate 작성일(시작)
	 * @param {string | null} endDate 작성일(끝)
	 * @param {number} category 카테고리
	 * @param {string | null} query 검색어
	 * @param {number} allCount 전체 게시글 수
	 * @param {number} perRange pagination 길이
	 * @param {number} perPage  페이지 당 게시글 수
	 * @param {number} currentPage 현재 페이지
	 * @param {FreeBoardSearchOption} option 
	 */
	constructor(option, startDate, endDate, category, query, allCount, perRange, perPage, currentPage) {
		let today = new Date();

		const mouth = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');

		this.#startDate = startDate || option?.getStartDate() || today.getFullYear() - 1 + `-${mouth}-${day}`;
		this.#endDate = endDate || option?.getEndDate() || today.getFullYear() + `-${mouth}-${day}`;
		this.#category = parseInt(category) || option?.getCategory();
		this.#query = query || option?.getQuery();
		this.#allCount = allCount || option?.getAllCount() || 0;
		this.#perRange = parseInt(perRange) || option?.getPerRange() || 10;
		this.#perPage = parseInt(perPage) || option?.getPerPage();
		this.#currentPage = parseInt(currentPage) || option?.getCurrentPage();
		this.updateMaxPage();
	}


	/**
	 * 최대 페이지 재계산
	*/
	updateMaxPage() {
		try {
			let mp = parseInt(this.#allCount / this.#perPage);
			this.#maxPage = (this.#allCount % this.#perPage) > 0 ? mp + 1 : mp;
			this.updateStartEndPage();
		} catch (e) {
			this.#maxPage = 0;
		}
	}

	/**
	 * 시작 번호, 끝 번호 재계산
	*/
	updateStartEndPage() {
		this.#startPage = parseInt((this.#currentPage - 1) / this.#perRange) + 1;
		this.#endPage = this.#startPage + this.#perRange - 1;
		if (this.#endPage > this.#maxPage) this.#endPage = this.#maxPage;
	}

	toSearchParam() {
		const searchParam = new URLSearchParams();

		if (this.#startDate) searchParam.set('startDate', this.#startDate);
		if (this.#endDate) searchParam.set('endDate', this.#endDate);
		if (this.#query) searchParam.set('query', this.#query);
		if (this.#category) searchParam.set('category', this.#category);
		if (this.#perPage) searchParam.set('perPage', this.#perPage);
		if (this.#currentPage) searchParam.set('currentPage', this.#currentPage);

		return '?' + searchParam.toString();
	}

	getStartDate() { return this.#startDate; }
	getEndDate() { return this.#endDate; }
	getCategory() { return this.#category; }
	getQuery() { return this.#query; }
	getAllCount() { return this.#allCount; }
	getPerRange() { return this.#perRange; }
	getPerPage() { return this.#perPage; }
	getCurrentPage() { return this.#currentPage; }
	getStartPage() { return this.#startPage; }
	getEndPage() { return this.#endPage; }
	getMaxPage() { return this.#maxPage; }

	setStartDate(startDate) { this.#startDate = startDate; }
	setEndDate(endDate) { this.#endDate = endDate; }
	setCategory(category) { this.#category = parseInt(category); }
	setQuery(query) { this.#query = query; }
	setAllCount(allCount) {
		this.#allCount = parseInt(allCount);
		this.updateMaxPage();
	}
	setPerRange(perRange) {
		this.#perRange = parseInt(perRange);
	}
	setPerPage(perPage) {
		this.#perPage = parseInt(perPage);
		this.updateStartEndPage();
	}
	setCurrentPage(currentPage) {
		this.#currentPage = parseInt(currentPage);
		if (this.#currentPage < 1) { this.#currentPage = 1; }
		this.updateStartEndPage();
	}
}