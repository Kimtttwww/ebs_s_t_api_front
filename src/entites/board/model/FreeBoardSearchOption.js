/**
 * 자유게시판 검색 조건
 */
export default class FreeBoardSearchOption {
	startDate = null;
	endDate = null;
	category = 0;
	query = null;
	// perPage = 10;


	/**
	 * @param {object} option 기존의 검색 조건
	 * @param {string | null} startDate 작성일(시작)
	 * @param {string | null} endDate 작성일(끝)
	 * @param {number} category 카테고리
	 * @param {string | null} query 검색어
	 */
	constructor({startDate, endDate, category, query}) {
		const today = new Date();
		const mouth = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');

		this.startDate = startDate || today.getFullYear() - 1 + `-${mouth}-${day}`;
		this.endDate = endDate || today.getFullYear() + `-${mouth}-${day}`;
		this.category = parseInt(category) || '';
		this.query = query || '';
	}
}