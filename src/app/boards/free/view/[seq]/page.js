"use client";

import UrlVO from '@/app/model/UrlVO';
import css from './page.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect, useParams } from 'next/navigation';

export default function FreeBoardViewPage(props) {
	const {seq} = useParams();
	const [board, setBoard] = useState({});

	useEffect(() => {
		const fnid = setTimeout(() => {
			axios.get(UrlVO.host + UrlVO.view + seq + '?add=true')
			.then((res) => {
				setBoard(res.data);
			});
		}, 250);

		return () => clearTimeout(fnid);
	}, []);

	
	// TODO client component 구현
	return(
		<>
			<h2>게시판 - 보기</h2>
			<br />
			<section className={'flex'} style={{textAlign: "center"}}>
				<p className={`${css.board_meta_data}`} style={{width: "50%", textAlign: "start"}}>{board.categoryName}&nbsp;{board.writer}</p>
				<p className={`${css.board_meta_data}`}>등록일시 {board.created}</p>
				<p className={`${css.board_meta_data}`}>수정일시 {board.updated == null ? "-" : board.updated}</p>
			</section>
			<section className={'flex'} style={{alignItems: "center"}}>
				<h3 className={`${css.board_info}`}>{board.title}</h3>
				<p className={`${css.board_info}`} style={{display: "flex", flexDirection: "row-reverse", paddingRight: "25px"}}>조회수: {board.views}</p>
			</section>
			<hr style={{border: "1px solid black"}} />
			<br />
			<section className={'flex'} style={{minHeight: "150px", padding: "0 15px", fontSize: "smaller"}}>
				<p style={{margin: 0}}>{board.content}</p>
			</section>
			<br />
			<br />
			<section style={{padding: "10px 15px", backgroundColor: "whitesmoke"}}>
				<article>{/* 복제 대상 */}
					<p className={`${css.chat}`}>1234.12.34 12:34</p>
					<p className={`${css.chat}`}>이거슨 댓글</p>
				</article>
				<hr />
				{/* TODO 댓글 구현 필요 */}
				<form method="post" action="???" className={'flex'} style={{margin: 0, justifyContent: "space-between", marginTop: "5px"}}>
					<textarea name="" placeholder="댓글을 입력해 주세요." style={{width: "91%", resize: "none"}}></textarea>
					<button type="button" className={'pointer'} style={{width: "8%", height: "50px"}}>등록</button>
				</form>
			</section>
			<hr />
			<section className={'flex'} style={{justifyContent: "center"}}>
				<button className={`${css.btn}`} onClick={() => redirect(UrlVO.list)} style={{backgroundColor: "black", color: "white"}}>목록</button>
				<button className={`${css.btn}`} onClick={() => redirect(UrlVO.modify + board.boardNo)}>수정</button>
				<button className={`${css.btn}`}>삭제</button>
			</section>
		</>
	);
}