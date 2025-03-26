// "use server";

import ApiPath from "@/shared/model/ApiPath";
import FreeBoardSearchOption from "@/shared/model/FreeBoardSearchOption";
import SearchParamConverter from "@/shared/SearchParamConverter";
import axios from "axios";

/**
 * 게시글 목록 가져오기
 * @param {FreeBoardSearchOption} option 검색 조건
 * @returns 게시글 목록과 전체 수가 포함된 검색 조건
 */
export function getBoardList(option) {
	return getRequest(ApiPath.boardList + SearchParamConverter(option))
}

/**
 * 게시글 유형 목록 가져오기
 * @returns 게시글 유형 목록
 */
export function getCategoryList() {
	return getRequest(ApiPath.categoryList);
}

/**
 * 단일 게시글 가져오기
 * @param {number} boardNo 조회할 게시글 번호
 * @param {boolean} turnViewUp 조회수 증가 여부
 * @returns 단일 게시글
 */
export function getBoard(boardNo, turnViewUp) {
	return getRequest(ApiPath.view + boardNo + '?add=' + Boolean(turnViewUp))
}

/**
 * 첨부파일 목록 가져오기
 * @param {number} boardNo 게시글 번호
 * @returns 첨부파일 목록
 */
export function getAttachList(boardNo) {
	return getRequest(ApiPath.attachList + boardNo);
}

export function getReplyList(boardNo) {
	return getRequest(ApiPath.attachList + boardNo);
}


/**
 * 서버로 요청 보내기
 * @param {string} url 자원 위치
 * @returns 응답 객체
 */
async function getRequest(url) {
	const data = await axios.get(url)
		.then((res) => res.data)
		.catch(() => null);

	return data;
}