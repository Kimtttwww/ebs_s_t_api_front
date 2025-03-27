"use client";

import { getCategoryList } from '@/shared/api/APIGetPack';
import ApiPath from '@/shared/model/ApiPath';
import { CRLFToTagConverter, XSSConverter } from '@/shared/util/TextConverter';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import css from './page.module.css';

export default function FreeBoardWritePage() {
	const inputs = useRef({});
	const attachs = useRef([]);
	const router = useRouter();
	const [category, setCategory] = useState([]);

	useEffect(() => {
		const fnid = setTimeout(async () => {
			setCategory(await getCategoryList());
		}, 250);

		return () => clearTimeout(fnid);
	}, []);

	/**
	 * 입력값 검증 및 게시글 등록
	 * @param {FormDataEvent} event 사용자의 게시글 등록 요청
	 */
	function newBoard(event) {
		event.preventDefault();
		let valid = true;
		const board = {};

		Object.entries(inputs.current).forEach(([key, element]) => {
			let regExp;
			switch (key) {
				case "writer":
					regExp = /^.{3,4}$/;
					valid = regExp.test(element.value)
					break;
				case "password":
					regExp = /^.[a-zA-Z0-9!@#$%^&*]{4,15}$/;
					const pwChk = element.nextElementSibling;
					valid = element.value == pwChk.value && regExp.test(element.value)
					break;
				case "title":
					regExp = /^.{4,99}$/;
					valid = regExp.test(element.value)
					break;
				case "content":
					regExp = /^.{4,1999}$/;
					valid = regExp.test(element.value)
					break;
			}
			board[key] = CRLFToTagConverter(element.value);
		});

		attachs.current.forEach(({files}) => {
			valid = !files.length || files[0]?.type.startsWith('image');
		});

		if (!valid) {
			alert("유효하지 않은 정보가 입력되었습니다.\n다시 한번 확인해주세요.");
			return;
		}

		board['categoryNo'] = parseInt(board['categoryNo']) ?? board['categoryNo'];

		const formData = new FormData();
		Object.entries(board).forEach(([key, value]) => {
			formData.set(key, value);
		});
		attachs.current
		.map((element) => element.files[0])
		.filter((file) => file)
		.forEach((file) => {
			formData.append('attachs', file);
		});

		axios.post(ApiPath.newboard, formData)
		.then(() => alert('게시글이 등록되었습니다.'))
		.catch((err) => {
			console.log(err);
			alert('게시글 등록에 실패했습니다.\n다시 시도해주세요.');
		});
	}

	/**
	 * 파일 선택시 선택한 파일명 출력
	 * @param {import('react').ChangeEvent<HTMLInputElement>} event 
	 */
	function fileHandler(event) {
		event.preventDefault();
		event.target.previousSibling.value = XSSConverter(event.target?.files[0]?.name) || '';
	}

	return (<>
		<h2>게시판 - 등록</h2>
		<br />
		<br />
		<form id='form' className={'flex'} onSubmit={(e) => newBoard(e)} style={{flexDirection: 'column', textAlign: 'center'}}>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>카테고리*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<select ref={(e) => inputs.current["categoryNo"] = e} className={`${css.form_value}`} required defaultValue={''}>
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
					<input ref={(e) => inputs.current["writer"] = e} type="text" className={`${css.form_value}`} required
						minLength={3} maxLength={4} pattern='^.{3,4}$' />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>비밀번호*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<input ref={(e) => inputs.current["password"] = e} type="password" className={`${css.form_value}`} placeholder="비밀번호" required
						minLength={4} maxLength={15} pattern='^.[a-zA-Z0-9!@#$%^&*]{4,15}$' style={{marginRight: '5px'}} />
					<input type="password" className={`${css.form_value}`} placeholder="비밀번호 확인" required style={{marginLeft: '5px'}} />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>제목*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<input ref={(e) => inputs.current["title"] = e} type="text" className={`${css.form_value}`} required minLength={4} maxLength={99} pattern='^.{4,99}$' style={{width: '99%'}} />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>내용*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<textarea ref={(e) => inputs.current["content"] = e} className={`${css.form_value}`} required minLength={4} maxLength={1999}
						style={{width: '99%', minHeight: '150px', resize: 'none'}}></textarea>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>파일첨부</h4>
				</article>
				<article className={`flex ${css.form_value_col}`} style={{flexDirection: 'column', textAlign: 'initial'}}>
					{function() {
						const elements = []
						for (let i = 0; i < 3; i++) {
							elements.push(
								<div key={'attachCol' + i} className='flex'>
									<input type="text" key={'attachName' + i} className={`${css.form_value}`} readOnly style={{marginRight: '5px'}} />
									<input type="file" key={'attach' + i} ref={(e) => attachs.current[i] = e} onChange={(e) => fileHandler(e)} accept='image/*' hidden />
									<button type='button' key={'fileBtn' + i} className={`${css.form_value}`} style={{width: 'auto', marginLeft: '5px'}} onClick={() => attachs.current[i]?.click()}>파일 선택</button>
								</div>
							);
						}
						return elements;
					}()}
				</article>
			</section>
		</form>
		<br />
		<br />
		<section className={'flex'} style={{justifyContent: 'space-between'}}>
			<button type="reset" className={`${css.btn}`} form='form' onClick={() => router.push("/boards/free/list")}>취소</button>
			<button type="submit" className={`${css.btn}`} form='form' style={{backgroundColor: 'forestgreen', color: 'white'}}>저장</button>
		</section>
	</>);
}