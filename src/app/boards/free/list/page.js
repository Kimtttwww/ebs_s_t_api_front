"use client";

import FreeBoardPath from '@/entites/board/api/FreeBoardPath';
import { getBoardList } from '@/features/board/api/FreeBoardGetAPI';
import Paging from '@/shared/ui/Paging';
import FreeBoardFilter from '@/widgets/board/FreeBoardFilter';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import css from './page.module.css';

export default function FreeBoardListPage() {
	const router = useRouter();
	const staticSearchParams = useSearchParams();
	const [allCount, setAllCount] = useState(0);
	const [boards, setBoards] = useState([]);

	useEffect(() => {(async () => {
		const data = await getBoardList(Object.fromEntries(staticSearchParams));

		if (data) {
			setAllCount(data.allCount);
			setBoards([...(data.board || [])]);
		}
	})()}, [staticSearchParams]);

	return (<>
		<h2>자유게시판 - 목록</h2>
		<br />
		<br />
		<FreeBoardFilter />
		<br />
		<br />
		<div>총 {allCount}건</div>
		<br />
		<section className={'flex'} style={{flexDirection: 'column', textAlign: 'center'}}>
			<article className={`flex ${css.list_row}`} style={{borderTop: '1px solid gray', borderBottom: '3px solid gray'}}>
				<h5 className={`${css.list_element} ${css.list_col1}`}>카테고리</h5>
				<h5 className={`${css.list_element} ${css.list_col2}`}>제목</h5>
				<h5 className={`${css.list_element} ${css.list_col3}`}>작성자</h5>
				<h5 className={`${css.list_element} ${css.list_col4}`}>조회수</h5>
				<h5 className={`${css.list_element} ${css.list_col5}`}>등록 일시</h5>
				<h5 className={`${css.list_element} ${css.list_col6}`}>수정 일시</h5>
			</article>
			{boards?.length && boards.map((b) => {
				return (
					<article key={'b' + b.boardNo} className={`flex ${css.list_row}`}>
						<p key={'b_category' + b.boardNo} className={`${css.list_element} ${css.list_col1}`}>{b.categoryName}</p>
						<a key={'b_title' + b.boardNo} className={`flex ${css.list_col2} ${css.board_title}`} onClick={() => router.push(`${FreeBoardPath.view}/${b.boardNo}`)}>{b.title}</a>
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
		<Paging defaultOption={{allCount}} />
		<br />
		<br />
		<section className={'flex'} style={{justifyContent: 'end'}}>
			<Button variant='outline-secondary' onClick={() => router.push(FreeBoardPath.write)} style={{width: '100px'}}>등록</Button>
		</section>
	</>);
}
