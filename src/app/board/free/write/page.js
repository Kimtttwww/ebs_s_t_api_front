"use client";

import { getCategoryList } from '@/shared/api/APIGetPack';
import ApiPath from '@/shared/model/ApiPath';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import css from './page.module.css';

export default function FreeBoardWritePage() {
	const inputs = useRef({});
	const router = useRouter();
	const [category, setCategory] = useState([]);

	useEffect(() => {
		const fnid = setTimeout(async () => {
			setCategory(await getCategoryList());
		}, 250);
		
		return () => clearTimeout(fnid);
		// TODO client component 구현
	}, []);
	
	// * @param {FormDataEvent} event 사용자의 게시글 등록 요청
	/**
	 * 입력값 검증 및 게시글 등록
	*/
	function newBoard(event) {
		console.log("asdfgdzfljserouh");
		console.log(inputs);
		event.preventDefault();
		let valid = true;
		const board = {};

		for (let i = 0; i < inputs.current.length || valid; i++) {
			const input = inputs.current[i];
			let regExp;

			switch (input?.name) {
				case "writer":
					regExp = /^.{3,4}$/;
					if (!regExp.test(input.value)) valid = false;
					break;
				case "password":
					regExp = /^.[a-zA-Z0-9!@#$%^&*]{4,15}$/;
					const pwChk = input.nextElementSibling;
					if (input.value !== pwChk.value || !regExp.test(input.value)) valid = false;
					break;
				case "title":
					regExp = /^.{4,99}$/;
					if (!regExp.test(input.value)) valid = false;
					break;
				case "content":
					regExp = /^.{4,1999}$/;
					if (!regExp.test(input.value)) valid = false;
					break;
			}
		}

		if (!valid) {
			alert("유효하지 않은 정보가 입력되었습니다.\n다시 한번 확인해주세요.");
			return;
		}

		// TODO 게시글 내용 중 crlf 처리 필요
		// TODO 게시글 등록 처리 필요
		axios.post(ApiPath.write, inputs.current)
		.then()
		.catch()
	}

	console.log(inputs);
	

	return (
		<>
			<h2>게시판 - 등록</h2>
			<br />
			<br />
			<form className={'flex'} onSubmit={(e) => newBoard(e)} style={{ flexDirection: 'column', textAlign: 'center' }}>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>카테고리*</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						<select name="categoryNo" className={`${css.form_value}`} required defaultValue={''}>
							<option value={''} disabled>카테고리 선택</option>
							{category?.length && category.map((c) => (
								<option key={'category' + c.categoryNo} value={c.categoryNo}>{c.name}</option>
							))}
						</select>
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>작성자*</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* asdf */}
						<input ref={(e) => { inputs.current[e?.name] = e?.value }} type="text" className={`${css.form_value}`} name="writer" required
							minLength={3} maxLength={4} pattern='^.[a-zA-Z0-9]{3,4}$' />
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>비밀번호*</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <input ref={(e) => { inputs.current[1] = e }} type="password" className={`${css.form_value}`} name="password" placeholder="비밀번호" required */}
							{/* minLength={4} maxLength={15} pattern='^.[a-zA-Z0-9!@#$%^&*]{4,15}$' style={{ marginRight: '5px' }} /> */}
						{/* <input ref={(e) => { inputs.current[2] = e }} type="password" className={`${css.form_value}`} placeholder="비밀번호 확인" required style={{ marginLeft: '5px' }} /> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>제목*</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <input ref={(e) => { inputs.current[3] = e }} type="text" className={`${css.form_value}`} name="title" required minLength={4} maxLength={99} pattern='^.{4,99}$' style={{ width: '99%' }} /> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>내용*</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <textarea ref={(e) => { inputs.current[4] = e }} name="content" className={`${css.form_value}`} required minLength={4} maxLength={1999} */}
							{/* style={{ width: '99%', minHeight: '150px', resize: 'none' }}></textarea> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>파일첨부</h4>
					</article>
					<article className={`flex ${css.form_value_col}`} style={{ flexDirection: 'column' }}>
						<div>
							<input type="text" className={`${css.form_value}`} readOnly />
							<input type="file" className={`${css.form_value}`} />
						</div>
						<div>
							<input type="text" className={`${css.form_value}`} readOnly />
							<input type="file" className={`${css.form_value}`} />
						</div>
						<div>
							<input type="text" className={`${css.form_value}`} readOnly />
							<input type="file" className={`${css.form_value}`} />
						</div>
					</article>
				</section>
			</form>
			<br />
			<br />
			<section id="btns" className={'flex'} style={{ justifyContent: 'space-between' }}>
				<button type="button" className={`${css.btn}`} form='form' onClick={() => router.push("/boards/free/list")}>취소</button>
				<button type="submit" className={`${css.btn}`} form='form' style={{ backgroundColor: 'forestgreen', color: 'white' }}>저장</button>
			</section>
		</>
	);
}