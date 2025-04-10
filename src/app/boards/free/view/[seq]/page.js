"use client";

import FreeBoardAPI from '@/entites/board/api/FreeBoardAPI';
import FreeBoardPath from '@/entites/board/api/FreeBoardPath';
import { getAttachList, getBoard, getReplyList } from '@/features/board/api/FreeBoardGetAPI';
import { XSSConverter } from '@/shared/lib/TextConverter';
import AttachInfoDiv from '@/widgets/board/AttachInfoDiv';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import css from './page.module.css';

export default function FreeBoardViewPage() {
	const replyContent = useRef();
	const router = useRouter();
	const {seq} = useParams();
	const [board, setBoard] = useState({});
	const [attachs, setAttachs] = useState([]);
	const [replys, setReplys] = useState([]);

	useEffect(() => { (async () => {
		const newBoard = await getBoard(seq, true);
		setBoard(newBoard);

		const requests = [getReplyList];
		if (newBoard?.attach) requests.push(getAttachList);

		const [newReplys, newAttachs] = await Promise.all(requests.map((req) => req(newBoard.boardNo)));
		setAttachs(newAttachs);
		setReplys(newReplys)
	})()}, []);

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

		axios.post(FreeBoardAPI.NEW_REPLY, newReply)
		.then((res) => {
			setReplys(res.data);
			replyContent.current.value = '';
			alert("댓글이 등록되었습니다. ");
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
				{/* TODO 검증 필요 */}
				{attachs?.length && attachs.map((a) => <AttachInfoDiv a={a} />) || ''}
			</article>
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
				<button type="submit" style={{width: "8%", height: "50px"}}>등록</button>
			</form>
		</section>
		<hr />
		<section className={'flex'} style={{justifyContent: "center"}}>
			<Button variant='info' className={`${css.btn}`} onClick={() => router.push(FreeBoardPath.list)} style={{backgroundColor: "black", color: "white"}}>목록</Button>
			<Button variant='success' className={`${css.btn}`} onClick={() => router.push(FreeBoardPath.modify + board.boardNo)}>수정</Button>
			<Button variant='danger' className={`${css.btn}`}>삭제</Button>
		</section>
	</>);
}