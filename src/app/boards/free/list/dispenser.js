import FreeBoardSearchOption from "@/app/model/FreeBoardSearchOption";
import UrlVO from "@/app/model/UrlVO";
import axios from "axios";

/**
 * 게시글 목록 가져오기
 * @param {FreeBoardSearchOption} option 검색 조건
 * @returns 게시글 목록과 전체 수가 포함된 검색 조건
 */
export async function getBoardList(option) {
	const data = await axios.get(UrlVO.host + UrlVO.list + option?.toSearchParam())
		.then((res) => res.data)
		.catch(() => null);

	return data;
}

/**
 * 게시글 유형 목록 가져오기
 * @returns 게시글 유형 목록
 */
export async function getCategoryList() {
	const data = await axios.get(UrlVO.host + '/boards/free/category')
		.then((res) => res.data)
		.catch(() => null);

	return data;
}