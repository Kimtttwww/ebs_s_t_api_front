import FreeBoardSearchOption from "@/entites/board/model/FreeBoardSearchOption";

/**
 * 기존의 URLSearchParams에 새 값들을 합쳐줌
 * @param {String | URLSearchParams} search 현 페이지의 location.search
 * @param {object} addOn URLSearchParams에 추가하고자 하는 plain object 형태의 값
 * @returns 합쳐진 URLSearchParams
 */
export function combineURLSearchParams(search, addOn) {
	const url = new URLSearchParams(search);

	Object.entries(addOn).forEach(([key, value]) => {
		url.set(key, value);
	});

	return url;
}

/**
 * redux에 저장된 fbso을 URLSearchParams.toString() 로 바꿈
 * @param {object | FreeBoardSearchOption} option redux에 저장된 fsbo 형태 값
 * @returns URLSearchParams.toString() 형태의 String
 */
export function SearchParamConverter(option) {
	const searchParam = new URLSearchParams();

	Object.entries(option)?.forEach(([key, value]) => {
		searchParam.set(key, value);
	})

	// if (option == null) return "";
	// if (option.startDate) searchParam.set('startDate', option.startDate || "");
	// if (option.endDate) searchParam.set('endDate', option.endDate || "");
	// if (option.query) searchParam.set('query', option.query || "");
	// if (option.category) searchParam.set('category', option.category || "");
	// if (option.perPage) searchParam.set('perPage', option.perPage || "");
	// if (option.currentPage) searchParam.set('currentPage', option.currentPage);

	return '?' + searchParam.toString();
}