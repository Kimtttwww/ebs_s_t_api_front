export default class PagingOption {
	#allCount = 0;
	#perRange = 0;
	#perPage = 0;
	#currentPage = 0;
	#startPage = 0;
	#endPage = 0;
	#maxPage = 0;


	/**
	 * 페이징 정보
	 * @param {PagingOption} option 기존의 페이징 정보
	 * @param {number} allCount 전체 게시글 수
	 * @param {number} perRange pagination 길이
	 * @param {number} perPage  페이지 당 게시글 수
	 * @param {number} currentPage 현재 페이지
	 */
	constructor ({allCount, perRange, perPage, currentPage}) {
		this.#allCount = allCount || 0;
		this.#currentPage = parseInt(currentPage) || 1;
		this.#perRange = parseInt(perRange) || 10;
		this.#perPage = parseInt(perPage) || 10;
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
		this.#startPage = parseInt((this.#currentPage - 1) / this.#perRange) * this.#perRange + 1;
		this.#endPage = this.#startPage + this.#perRange - 1;
		if (this.#endPage > this.#maxPage) this.#endPage = this.#maxPage;
	}

	getAllCount() { return this.#allCount; }
	getPerRange() { return this.#perRange; }
	getPerPage() { return this.#perPage; }
	getCurrentPage() { return this.#currentPage; }
	getStartPage() { return this.#startPage; }
	getEndPage() { return this.#endPage; }
	getMaxPage() { return this.#maxPage; }

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
		if (this.#currentPage < 1) this.#currentPage = 1;
		this.updateStartEndPage();
	}

}