"use client";

import UrlVO from '@/app/model/UrlVO';
import css from './page.module.css';
import { redirect } from 'next/navigation';

export default function FreeBoardModifyPage(params) {
	return(
		<>
			<h2>게시판 - 수정</h2>
			<br />
			<br />
			<form id="form" className={'flex'} method="post" action="/board/free/modify" onsubmit="editBoard(event)" style={{flexDirection: "column"}}>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>카테고리</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <p className={`flex ${css.form_value}`}>${ b.categoryName }</p> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>등록일시</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <p className={`flex ${css.form_value}`}>${ b.created }</p> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>수정일시</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <p className={`flex ${css.form_value}`}>${ b.updated != null ? b.updated : '-' }</p> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>조회수</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <p className={`flex ${css.form_value}`}>${ b.views }</p> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>작성자</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <p className={`flex ${css.form_value}`}>${ b.writer }</p> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>비밀번호*</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						<input type="password" name="password" placeholder="비밀번호" required />
						{/* <input type="hidden" className={`${css.form_value}`} name="boardNo" value="${ b.boardNo }" /> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>제목</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <input type="text" className={`${css.form_value}`} name="title" value="${ b.title }" required style={{width: "99%"}} /> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>내용</h4>
					</article>
					<article className={`flex ${css.form_value_col}`}>
						{/* <textarea name="content" className={`${css.form_value}`} required style={{width: "99%", minHeight: "150px", resize: "none"}}>${ b.content }</textarea> */}
					</article>
				</section>
				<section className={`${css.form_row}`}>
					<article className={`flex ${css.form_title_col}`}>
						<h4 className={`${css.form_title}`}>파일첨부</h4>
					</article>
					<article className={`flex ${css.form_value_col}`} style={{flexDirection: "column"}}>
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
			<section id="btns" className="flex" style={{justifyContent: "space-between"}}>
				<button type="button" className={`${css.btn}`} form="form" onClick={() => redirect(UrlVO.list)}>취소</button>
				<button type="submit" className={`${css.btn}`} form="form" style={{backgroundColor: "forestgreen", color: "white"}}>저장</button>
			</section>
		</>
	);
}