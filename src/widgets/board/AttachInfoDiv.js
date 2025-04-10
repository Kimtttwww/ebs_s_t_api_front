'use client'

import { getAttachFile } from "@/features/board/api/FreeBoardGetAPI";

/**
 * view, modify 에 쓰일 첨부파일 표시 디자인
 * @param {object} a attach
 * @param {boolean} isWrite write = false, modify = true 
 * @returns attach 파일명과 다운로드 기능
 */
export default function AttachInfoDiv({a, isWrite}) {
	const property = isWrite ? {} : {onClick: () => getAttachFile(a?.boardNo, a?.attachNo)}
	return (<>
		<div className='flex'>
			<a key={"attachNo" + a?.attachNo} {...property}>💾 {a?.fileName}</a>
			{Boolean(property.onClick) && (() => (
				<button type='button' {...property}>Download</button>
			))()}
		</div>
	</>);
}