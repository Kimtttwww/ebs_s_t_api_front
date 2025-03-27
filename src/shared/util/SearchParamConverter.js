import FreeBoardSearchOption from "../model/FreeBoardSearchOption";

/**
 * redux에 저장된 fbso을 URLSearchParams.toString() 로 바꿈
 * @param {FreeBoardSearchOption} option redux에 저장된 fsbo 형태 값
 * @returns URLSearchParams.toString() 형태의 String
 */
export default function (option) {
	const searchParam = new URLSearchParams();

	if (option == null) return "";
	if (option.startDate) searchParam.set('startDate', option.startDate || "");
	if (option.endDate) searchParam.set('endDate', option.endDate || "");
	if (option.query) searchParam.set('query', option.query || "");
	if (option.category) searchParam.set('category', option.category || "");
	if (option.perPage) searchParam.set('perPage', option.perPage || "");
	if (option.currentPage) searchParam.set('currentPage', option.currentPage);

	return '?' + searchParam.toString();
}