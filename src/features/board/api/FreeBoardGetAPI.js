"use server";

import FreeBoardAPI from "@/entites/board/api/FreeBoardAPI";
import FreeBoardSearchOption from "@/entites/board/model/FreeBoardSearchOption";
import { SearchParamConverter } from "@/shared/lib/SearchParamsUtility";
import axios from "axios";

/**
 * 게시글 목록 가져오기
 * @param {object | FreeBoardSearchOption} option 검색 조건
 * @returns 게시글 목록과 전체 수가 포함된 검색 조건
 */
export async function getBoardList(option) {
	return getRequest(FreeBoardAPI.BOARD_LIST + SearchParamConverter(option))
}

/**
 * 게시글 유형 목록 가져오기
 * @returns 게시글 유형 목록
 */
export async function getCategoryList() {
	return getRequest(FreeBoardAPI.CATEGORY_LIST);
}

/**
 * 단일 게시글 가져오기
 * @param {number} boardNo 조회할 게시글 번호
 * @param {boolean} turnViewUp 조회수 증가 여부
 * @returns 단일 게시글
 */
export async function getBoard(boardNo, turnViewUp) {
	return getRequest(FreeBoardAPI.BOARD + boardNo + '?add=' + Boolean(turnViewUp))
}

/**
 * 첨부파일 목록 가져오기
 * @param {number} boardNo 게시글 번호
 * @returns 첨부파일 목록
 */
export async function getAttachList(boardNo) {
	return getRequest(FreeBoardAPI.ATTACH_LIST + boardNo);
}

/**
 * 댓글 목록 가져오기
 * @param {number} boardNo 게시글 번호
 * @returns 댓글 목록
 */
export async function getReplyList(boardNo) {
	return getRequest(FreeBoardAPI.REPLY_LIST + boardNo);
}

/**
 * 첨부파일 다운로드
 * @param {number} boardNo 게시글 번호
 * @param {number} attachNo 첨부파일 번호
 * @returns 다운로드된 첨부파일
 */
export async function getAttachFile(boardNo, attachNo) {
	return getRequest(FreeBoardAPI.ATTACH + boardNo + '/' + attachNo);
}


/**
 * 서버로 요청 보내기
 * @param {string} url 자원 위치
 * @returns 응답 객체
 */
async function getRequest(url) {
	const data = await axios.get(url)
		.then((res) => res.data)
		.catch(() => {
			console.log('실패');

			return null
		});

	return data;
}