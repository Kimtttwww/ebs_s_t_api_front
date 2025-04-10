"use client";

import FreeBoardAPI from '@/entites/board/api/FreeBoardAPI';
import css from '@/entites/board/css/write_modify.module.css';
import { getAttachList, getBoard } from '@/features/board/api/FreeBoardGetAPI';
import useFreeBoardChange from '@/features/board/hooks/useFreeBoardChange';
import AddNewFileInput from '@/widgets/board/AddNewFIleInput';
import AttachInfoDiv from '@/widgets/board/AttachInfoDiv';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function FreeBoardModifyPage() {
	const seq = useSearchParams().get('boardNo');
	const router = useRouter();
	const [board, setBoard] = useState({});
	const [attach, setAttach] = useState([]);
	const {boardRef, attachRef} = useFreeBoardChange();

	useEffect(() => { (async () => {
		const requests = [getBoard, getAttachList];
		const [newBoard, newAttachs] = await Promise.all(requests.map((req) => req(seq)));

		setBoard(newBoard);
		setAttach(newAttachs);
	})()}, []);

	/**
	 * 게시글 수정
	 * @param {object} data form의 유효한 정보를 가진 모든 input의 정보
	 * TODO modify 포함으로 로직 변경 필요
	 */
	function updateBoard(data) {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => formData.set(key, value));
		attachRef.current
		.map((element) => element.files[0])
		.forEach((file) => formData.append('attachs', file));

		axios.put(FreeBoardAPI.CHANGE_BOARD, formData)
		.then(() => alert('게시글이 등록되었습니다.'))
		.catch((err) => {
			console.log(err);
			alert('게시글 등록에 실패했습니다.\n다시 시도해주세요.');
		});
	}

	// TODO 유효성 검사 적용 필요
	return (<>
		<h2>게시판 - 수정</h2>
		<br />
		<br />
		<form id="form" className={'flex'} onSubmit={(e) => updateBoard(e)} style={{ flexDirection: "column" }}>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>카테고리</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<p className={`flex ${css.form_value}`} style={{textAlign: 'center'}}>{board?.categoryName}</p>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>등록일시</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<p className={`flex ${css.form_value}`} style={{textAlign: 'center'}}>{board?.created}</p>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>수정일시</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<p className={`flex ${css.form_value}`} style={{textAlign: 'center'}}>{board?.updated || '-'}</p>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>조회수</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<p className={`flex ${css.form_value}`} style={{textAlign: 'center'}}>{board?.views}</p>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>작성자</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<p className={`flex ${css.form_value}`} style={{textAlign: 'center'}}>{board?.writer}</p>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>비밀번호*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<input type="password" ref={(e) => boardRef.current['password'] = e} className={`${css.form_value}`} placeholder="비밀번호" required />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>제목</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<input type="text" ref={(e) => boardRef.current['title'] = e} className={`${css.form_value}`} defaultValue={board?.title} required
						minLength={4} maxLength={99} pattern='^.{4,99}$' style={{width: "99%"}} />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>내용</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<textarea name="content" ref={(e) => boardRef.current['content'] = e} className={`${css.form_value}`} defaultValue={board?.content} required
						minLength={4} maxLength={1999} style={{width: "99%", minHeight: "150px", resize: "none"}}></textarea>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>파일첨부</h4>
				</article>
				<article className={`flex ${css.form_value_col}`} style={{flexDirection: "column"}}>
					{function () {
						for (const elements = []; ; ) {
							const someAttach = attach.find((a) => a.attachNo == elements.length + 1)
							elements.push(someAttach ?
								<AttachInfoDiv a={someAttach} /> :
								<AddNewFileInput attachRef={attachRef} i={elements.length} />)
							if (elements.length >= 3) return elements;
						}
					}()}
				</article>
			</section>
		</form>
		<br />
		<br />
		<section className="flex" style={{justifyContent: "space-between"}}>
			<Button variant='secondary' form='form' onClick={() => router.push(FreeBoardPath.list)}>취소</Button>
			<Button type="submit" variant='success' form='form'>저장</Button>
		</section>
	</>);
}