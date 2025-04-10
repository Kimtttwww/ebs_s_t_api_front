"use client";

import FreeBoardAPI from '@/entites/board/api/FreeBoardAPI';
import css from '@/entites/board/css/write_modify.module.css';
import FreeBoardValidateOption from '@/entites/board/model/FreeBoardValidateOption';
import { getCategoryList } from '@/features/board/api/FreeBoardGetAPI';
import useFreeBoardChange from '@/features/board/hooks/useFreeBoardChange';
import AddNewFileInput from '@/widgets/board/AddNewFIleInput';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

// TODO custum hook 적용 이후 동작 검증 필요
export default function FreeBoardWritePage() {
	const router = useRouter();
	const {register, watch, handleSubmit} = useForm();
	const [category, setCategory] = useState([]);
	const {attachRef} = useFreeBoardChange();

	useEffect(() => {(async () => setCategory(await getCategoryList()))()}, []);

	/**
	 * 게시글 등록
	 * @param {object} data form의 유효한 정보를 가진 모든 input의 정보
	 * TODO modify 포함으로 로직 변경 필요
	 */
	function newBoard(data) {
		const formData = new FormData();

		Object.entries(data).forEach(([key, value]) => formData.set(key, value));
		attachRef.current
		.map((element) => element.files?.[0])
		.forEach((file) => formData.append('attachs', file));

		axios.post(FreeBoardAPI.NEW_BOARD, formData)
		.then(() => alert('게시글이 등록되었습니다.'))
		.catch((err) => {
			console.log(err);
			alert('게시글 등록에 실패했습니다.\n다시 시도해주세요.');
		});
	}

	return (<>
		<h2>게시판 - 등록</h2>
		<br />
		<br />
		<form id='form' className={'flex'} onSubmit={handleSubmit(newBoard)} style={{flexDirection: 'column', textAlign: 'center'}}>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>카테고리*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<select {...register('categoryNo', FreeBoardValidateOption.CATEGORY)} defaultValue={''} className={`${css.form_value}`}>
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
					<input type="text" {...register('writer', FreeBoardValidateOption.WRITER)} className={`${css.form_value}`} />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>비밀번호*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<input type="password" {...register('password', FreeBoardValidateOption.PASSWORD)} className={`${css.form_value}`} style={{marginRight: '5px'}} />
					<input type="password" {...register('passwordCheck', FreeBoardValidateOption.PASSWORD_CHECK(watch('password')))} className={`${css.form_value}`} style={{marginLeft: '5px'}} />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>제목*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<input type="text" {...register('title', FreeBoardValidateOption.TITLE)} className={`${css.form_value}`} style={{width: '99%'}} />
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>내용*</h4>
				</article>
				<article className={`flex ${css.form_value_col}`}>
					<textarea {...register('content', FreeBoardValidateOption.CONTENT)} className={`${css.form_value}`} style={{width: '99%', minHeight: '150px', resize: 'none'}}></textarea>
				</article>
			</section>
			<section className={`${css.form_row}`}>
				<article className={`flex ${css.form_title_col}`}>
					<h4 className={`${css.form_title}`}>파일첨부</h4>
				</article>
				<article className={`flex ${css.form_value_col}`} style={{flexDirection: 'column', textAlign: 'initial'}}>
					{function () {
						for (const elements = []; ; ) {
							elements.push(<AddNewFileInput ref={attachRef} i={elements.length} />);
							if (elements.length >= 3) return elements;
						}
					}()}
				</article>
			</section>
		</form>
		<br />
		<br />
		<section className={'flex'} style={{justifyContent: 'space-between'}}>
			<Button variant='secondary' form='form' onClick={() => router.push("/boards/free/list")}>취소</Button>
			<Button type="submit" variant='success' form='form'>저장</Button>
		</section>
	</>);
}