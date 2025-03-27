"use client";

import { getAttachFile, getAttachList, getBoard, getReplyList } from '@/shared/api/APIGetPack';
import ApiPath from '@/shared/model/ApiPath';
import PagePath from '@/shared/model/PagePath';
import { XSSConverter } from '@/shared/util/TextConverter';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import css from './page.module.css';

export default function FreeBoardViewPage() {
	const replyContent = useRef();
	const router = useRouter();
	const {seq} = useParams();
	const [board, setBoard] = useState({});
	const [attachs, setAttachs] = useState([]);
	const [replys, setReplys] = useState([]);

	useEffect(() => {
		const fnid = setTimeout(async () => {
			const newBoard = await getBoard(seq, true);
			setBoard(newBoard);
			setReplys(await getReplyList(seq))

			if (newBoard?.attach) {
				setAttachs(await getAttachList(seq));
			}
		}, 250);

		return () => clearTimeout(fnid);
	}, []);

	/**
	 * 새 댓글 추가 이벤트 핸들러
	 * @param {import('react').FormEvent} e event
	 */
	function replyInsertHandler(e) {
		e.preventDefault();

		const newReply = {
			boardNo: board.boardNo,
			[replyContent.current.name]: XSSConverter(replyContent.current.value)
		};

		axios.post(ApiPath.newReply, newReply)
		.then((res) => {
			setReplys(res.data);
			replyContent.current.value = '';
		}).catch((err) => {
			console.log(err);
			alert("댓글 등록에 실패했습니다");
		});
	}

	return(<>
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
		<section className={'flex'} style={{flexDirection: 'column', padding: "0 15px"}}>
			<p style={{minHeight: "150px", margin: 0, fontSize: "smaller"}}>{board.content}</p>
			<article className='flex' style={{flexDirection: 'column'}}>
				{attachs?.length && attachs.map((a) => (<>
					{/* TODO 검증 필요 */}
					<a key={"attachNo" + a.attachNo} onClick={() => getAttachFile(a.boardNo, a.attachNo)}>💾 {a.fileName}</a>
				</>)) || ''}
			</article>
		</section>
		<section>
		</section>
		<br />
		<br />
		<section style={{padding: "10px 15px", backgroundColor: "whitesmoke"}}>
			<article>
				{replys?.length && replys.map((r, i) => (<>
					<p key={"reply_" + r.created} className={`${css.chat}`}>{r.created}</p>
					<p key={"reply_" + r.created + "_content"} className={`${css.chat}`}>{r.content}</p>
					<hr key={'hr' + i} />
				</>)) || ''}
			</article>

			<form className={'flex'} onSubmit={(e) => replyInsertHandler(e)} style={{margin: 0, justifyContent: "space-between", marginTop: "5px"}}>
				<textarea ref={replyContent} name='content' placeholder="댓글을 입력해 주세요." required style={{width: "91%", resize: "none"}}></textarea>
				<button type="submit" className={'pointer'} style={{width: "8%", height: "50px"}}>등록</button>
			</form>
		</section>
		<hr />
		<section className={'flex'} style={{justifyContent: "center"}}>
			<button className={`${css.btn}`} onClick={() => router.push(PagePath.list)} style={{backgroundColor: "black", color: "white"}}>목록</button>
			<button className={`${css.btn}`} onClick={() => router.push(PagePath.modify + board.boardNo)}>수정</button>
			<button className={`${css.btn}`}>삭제</button>
		</section>
	</>);
}