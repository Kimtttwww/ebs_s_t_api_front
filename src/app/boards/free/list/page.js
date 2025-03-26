"use client";

import { setFBSO } from '@/entites/redux/slices/FreeBoardSearchOptionSlice';
import { getBoardList, getCategoryList } from '@/shared/api/APIGetPack';
import PagePath from '@/shared/model/PagePath';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './page.module.css';

export default function FreeBoardListPage() {
	const router = useRouter();
	const inputs = useRef({});
	const staticSearchParams = useSearchParams();
	const [boards, setBoards] = useState([]);
	const [categorys, setCategorys] = useState([]);
	const searchOption = useSelector(state => state.freeBoardSearchOption);
	const dispather = useDispatch();

	useEffect(() => {
		const fnid = setTimeout(async () => {
			const cData = await getCategoryList();
			setCategorys(cData);
		}, 250);

		return () => clearTimeout(fnid);
	}, []);

	/**
	 * @description url 변경을 반영했으나 2번 요청이 들어감
	 */
	useEffect(() => {
		const fnid = setTimeout(async () => {
			const newSearchOption = {...searchOption, ...Object.fromEntries(staticSearchParams.entries())}

			const data = await getBoardList(newSearchOption);

			if (data) {
				setBoards([...(data.board || [])]);
				dispather(setFBSO({...newSearchOption, allCount: data.allCount}));
			}
			if (inputs?.current['category']) inputs.current['category'].value = searchOption.category || '';
		}, 250);

		return () => clearTimeout(fnid);
	}, [searchOption.startDate, searchOption.endDate, searchOption.category, searchOption.query, searchOption.currentPage]);

	/**
	 * 검색 처리
	 * @param {FormDataEvent} event 사용자의 검색 요청
	*/
	function searching(event) {
		event.preventDefault();
		const newSearchOption = {currentPage: 1};

		Object.entries(inputs.current).forEach(([key, value]) => {
			newSearchOption[key] = value.value;
		});

		const url = combineURLSearchParams(staticSearchParams, newSearchOption);
		router.push(`?${url.toString()}`);
	}

	/**
	 * 페이지 이동 처리
	 * @param {number} pageNum 가고자 하는 페이지 번호
	 */
	function forwarder(pageNum) {
		const url = combineURLSearchParams(staticSearchParams, {currentPage: pageNum > 0 ? pageNum : 1})
		router.push(`?${url.toString()}`);
	}

	/**
	 * 기존의 URLSearchParams에 새 값들을 합쳐줌
	 * @param {String} search 현 페이지의 location.search
	 * @param {object} addOn URLSearchParams에 추가하고자 하는 plain object 형태의 값
	 * @returns 합쳐진 URLSearchParams
	 */
	function combineURLSearchParams(search, addOn) {
		const url = new URLSearchParams(search);

		Object.entries(addOn).forEach(([key, value]) => {
			url.set(key, value);
		});

		return url;
	}

	return (
		<>
			<h2>자유게시판 - 목록</h2>
			<br />
			<br />
			<form className={'flex'} onSubmit={(e) => searching(e)} style={{ height: '50px', justifyContent: 'space-evenly', border: '1px solid lightgray', padding: '5px 10px' }}>
				<article className={`flex ${css.filter_box}`}>
					<label className={`${css.filter_element}`} style={{ width: '50px' }}>등록일</label>
					<input type="date" ref={e => inputs.current['startDate'] = e} className={`${css.filter_input} ${css.filter_element}`} defaultValue={searchOption?.startDate} />
					<label className={`${css.filter_element}`}>-</label>
					<input type="date" ref={e => inputs.current['endDate'] = e} className={`${css.filter_input} ${css.filter_element}`} defaultValue={searchOption?.endDate} />
				</article>
				<article className={`flex ${css.filter_box}`}>
					<select ref={e => inputs.current['category'] = e} className={`${css.filter_input} ${css.filter_element}`} defaultValue={searchOption?.category || ''}>
						<option value={''}>전체 카테고리</option>
						{categorys?.length && categorys.map((c) =>(
							<option key={'category' + c.categoryNo} value={c.categoryNo}>{c.name}</option>
						))}
					</select>
					<input type="text" ref={e => inputs.current['query'] = e} className={`${css.filter_element}`} placeholder="검색어를 입력해 주세요 (제목+작성자+내용)" defaultValue={searchOption.query} style={{ width: '400px' }} />
					<button type="submit" className={`pointer ${css.filter_element}`} style={{ width: '80px', borderRadius: 0 }}>검색</button>
				</article>
			</form>
			<br />
			<br />
			<div>총 {searchOption.allCount}건</div>
			<br />
			<br />
			<section className={'flex'} style={{ flexDirection: 'column', textAlign: 'center' }}>
				<article className={`flex ${css.list_row}`} style={{ borderTop: '1px solid gray', borderBottom: '3px solid gray' }}>
					<h4 className={`${css.list_element} ${css.list_col1}`}>카테고리</h4>
					<h4 className={`${css.list_element} ${css.list_col2}`}>제목</h4>
					<h4 className={`${css.list_element} ${css.list_col3}`}>작성자</h4>
					<h4 className={`${css.list_element} ${css.list_col4}`}>조회수</h4>
					<h4 className={`${css.list_element} ${css.list_col5}`}>등록 일시</h4>
					<h4 className={`${css.list_element} ${css.list_col6}`}>수정 일시</h4>
				</article>
				{boards?.length && boards.map((b) => {
					return (
						<article key={'b' + b.boardNo} className={`flex ${css.list_row}`}>
							<p key={'b_category' + b.boardNo} className={`${css.list_element} ${css.list_col1}`}>{b.categoryName}</p>
							<a key={'b_title' + b.boardNo} className={`flex ${css.list_col2} ${css.board_title}`} onClick={() => router.push(`${PagePath.view}/${b.boardNo}`)}>{b.title}</a>
							<p key={'b_writer' + b.boardNo} className={`${css.list_element} ${css.list_col3}`}>{b.writer}</p>
							<p key={'b_views' + b.boardNo} className={`${css.list_element} ${css.list_col4}`}>{b.views}</p>
							<p key={'b_created' + b.boardNo} className={`${css.list_element} ${css.list_col5}`}>{b.created}</p>
							<p key={'b_updated' + b.boardNo} className={`${css.list_element} ${css.list_col6}`}>{b.updated == null ? "-" : b.updated}</p>
						</article>
					);
				}) || '검색 결과가 없습니다'}
			</section>
			<br /><br />
			<br /><br />
			<section className={'flex'} style={{ justifyContent: 'center' }}>
				<article className={'flex'} style={{ justifyContent: 'space-evenly' }}>
					{searchOption && ((searchOption.startPage - searchOption.perRange) > 0) && (function () {
						return (<a className={`${css.page}`} onClick={() => forwarder(searchOption.currentPage - searchOption.perRange)}>&lt;&lt;</a>)
					})() || ''}
					{searchOption && searchOption.currentPage > 0 && (function () {
						return (<a className={`${css.page}`} onClick={() => forwarder(searchOption.currentPage - 1)}>&lt;</a>)
					})() || ''}
					{searchOption && (function () {
						let elements = [];
						for (let i = searchOption.startPage; i <= searchOption.endPage; i++) {
							elements.push(
								<a key={'page' + i} className={`${css.page} ${i == searchOption.currentPage ? css.currentPage : ''}`}
									onClick={() => (i != searchOption.currentPage ? forwarder(i) : '')}>{i}</a>
							);
						}
						return elements;
					})()}
					{searchOption && searchOption.currentPage < searchOption.maxPage && (function () {
						return (<a className={`${css.page}`} onClick={() => forwarder(searchOption.currentPage + 1)}>&gt;</a>)
					})() || ''}
					{searchOption && searchOption.endPage < searchOption.maxPage && (function () {
						return (<a className={`${css.page}`} onClick={() => forwarder(searchOption.endPage + 1)}>&gt;&gt;</a>)
					})() || ''}
				</article>
			</section>
			<br />
			<br />
			<section className={'flex'} style={{ justifyContent: 'end' }}>
				<button type="button" className={'pointer'} onClick={() => router.push(PagePath.write)} style={{ width: '100px', height: '35px', fontSize: 'medium' }}>등록</button>
			</section>
		</>
	);
}