"use client";

import FreeBoardSearchOption from '@/app/model/FreeBoardSearchOption';
import UrlVO from '@/app/model/UrlVO';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getBoardList, getCategoryList } from './dispenser';
import css from './page.module.css';

export default function FreeBoardListPage(props) {
	const router = useRouter();
	const inputs = useRef([]);
	const [boards, setBoards] = useState([]);
	const [categorys, setCategorys] = useState([]);
	const [searchOption, setSearchOption] = useState(new FreeBoardSearchOption());
	// const {startDate, endDate, category, query, currentPage} = searchOption;

	// TODO 1. param을 긁어서 최초 검색조건을만들고
	// 2. 데이터 가져오고
	// 3. 요청을 하면 param만 바꾼다
	useEffect(() => {
		const fnid = setTimeout(async () => {
			const data = await getCategoryList();
			setCategorys(data);
			getData();
		}, 250);

		return () => clearTimeout(fnid);
	}, []);

	// useEffect(() => {
	// 	const fnid = setTimeout(getData, 5000);

	// 	return () => clearTimeout(fnid);
	// }, [startDate, endDate, category, query, currentPage]);

	/**
	 * url에 있는 매개변수를 검색조건에 반영해서 값 가져오기
	*/
	async function getData() {
		const urlParam = new URLSearchParams(location.search?.replace('?', ''));
		console.log('수정 전');
		console.log(urlParam.toString());

		urlParam.forEach((val, key) => {
			switch (key) {
				case 'startDate':
					searchOption.setStartDate(val);
					break;
				case 'endDate':
					searchOption.setEndDate(val);
					break;
				case 'category':
					searchOption.setCategory(val);
					break;
				case 'query':
					searchOption.setQuery(val);
					break;
				case 'perPage':
					searchOption.setPerPage(val);
					break;
				case 'currentPage':
					searchOption.setCurrentPage(val);
					break;
			}
		});
		console.log('수정 후');
		console.log(searchOption);
		
		const data = await getBoardList(searchOption);

		if (data) {
			setBoards([...(data.board || [])]);
			const { startDate, endDate, category, query, perPage, currentPage, allCount } = data.searchOption;
			setSearchOption(new FreeBoardSearchOption(searchOption, startDate, endDate, category, query, allCount, 0, perPage, currentPage));
		}
		if (inputs?.current[2]) inputs.current[2].value = searchOption.getCategory() || '';
	}

	/**
	 * 검색 처리
	 * @param {FormDataEvent} event 사용자의 검색 요청
	 */
	function searching(event) {
		event.preventDefault();
		console.log("검색 요청 호출됨");
		// TODO 검색 처리 함수 구현 필요
		
		console.log(inputs.current);
	}

	/**
	 * 페이지 이동 처리
	 * @param {number} pageNum 가고자 하는 페이지 번호
	*/
	function dispather(pageNum) {
		const url = new URLSearchParams(location.search?.replace('?', ''));
		url.set('currentPage', pageNum || 1);
		setSearchOption(new FreeBoardSearchOption(searchOption, null, null, null, null, null, null, null, pageNum));

		router.push(`?${url.toString()}`);
	}

	// console.log(boards);
	// console.log(categorys);
	console.log(searchOption);

	return (
		<>
			<h2>자유게시판 - 목록</h2>
			<br />
			<br />
			<form method="get" className={'flex'} onSubmit={(e) => searching(e)} style={{ height: '50px', justifyContent: 'space-evenly', border: '1px solid lightgray', padding: '5px 10px' }}>
				<article className={`flex ${css.filter_box}`}>
					<label className={`${css.filter_element}`} style={{ width: '50px' }}>등록일</label>
					<input type="date" ref={e => inputs.current[0] = e} className={`${css.filter_input} ${css.filter_element}`} name="startDate" defaultValue={searchOption.getStartDate()} />
					<label className={`${css.filter_element}`}>-</label>
					<input type="date" ref={e => inputs.current[1] = e} className={`${css.filter_input} ${css.filter_element}`} name="endDate" defaultValue={searchOption.getEndDate()} />
				</article>
				<article className={`flex ${css.filter_box}`}>
					<select ref={e => inputs.current[2] = e} name="category" className={`${css.filter_input} ${css.filter_element}`} defaultValue={searchOption.getCategory() || ''}>
						<option value={''} disabled>전체 카테고리</option>
						{categorys && categorys.length && categorys.map((c) =>(
							<option key={'category' + c.categoryNo} value={c.categoryNo}>{c.name}</option>
						))}
					</select>
					<input type="text" ref={e => inputs.current[3] = e} name="query" className={`${css.filter_element}`} placeholder="검색어를 입력해 주세요 (제목+작성자+내용)" defaultValue={searchOption.getQuery()} style={{ width: '400px' }} />
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
				{boards && boards.length && boards.map((b) => {
					return (
						<article key={'b' + b.boardNo} className={`flex ${css.list_row}`}>
							<p key={'b_category' + b.boardNo} className={`${css.list_element} ${css.list_col1}`}>{b.categoryName}</p>
							<a key={'b_title' + b.boardNo} className={`flex ${css.list_col2} ${css.board_title}`} onClick={() => router.push(`${UrlVO.view}/${b.boardNo}`)}>{b.title}</a>
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
					{searchOption && ((searchOption.getStartPage() - searchOption.getPerRange()) > 0) && (function () {
						return (<a className={`${css.page}`} onClick={() => dispather(searchOption.getCurrentPage() - searchOption.getPerRange())}>&lt;&lt;</a>)
					})() || ''}
					{searchOption && searchOption.getCurrentPage() > 0 && (function () {
						return (<a className={`${css.page}`} onClick={() => dispather(searchOption.getCurrentPage() - 1)}>&lt;</a>)
					})() || ''}
					{searchOption && (function () {
						let elements = [];
						for (let i = searchOption.getStartPage(); i <= searchOption.getEndPage(); i++) {
							elements.push(
								<a key={'page' + i} className={`${css.page} ${i == searchOption.getCurrentPage() ? css.currentPage : ''}`}
									onClick={() => (i != searchOption.getCurrentPage() ? dispather(i) : '')}>{i}</a>
							);
						}
						return elements;
					})()}
					{searchOption && searchOption.getCurrentPage() < searchOption.getMaxPage() && (function () {
						return (<a className={`${css.page}`} onClick={() => dispather(searchOption.getCurrentPage() + 1)}>&gt;</a>)
					})() || ''}
					{searchOption && searchOption.getEndPage() < searchOption.getMaxPage() && (function () {
						return (<a className={`${css.page}`} onClick={() => dispather(searchOption.getEndPage() + 1)}>&gt;&gt;</a>)
					})() || ''}
				</article>
			</section>
			<br />
			<br />
			<section className={'flex'} style={{ justifyContent: 'end' }}>
				<button type="button" className={'pointer'} onClick={() => router.push(UrlVO.write)} style={{ width: '100px', height: '35px', fontSize: 'medium' }}>등록</button>
			</section>
		</>
	);
}