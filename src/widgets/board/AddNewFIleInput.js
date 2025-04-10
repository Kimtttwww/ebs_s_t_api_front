import css from '@/entites/board/css/write_modify.module.css';
import { XSSConverter } from '@/shared/lib/TextConverter';
import { Button } from 'react-bootstrap';

/**
 * 파일 첨부에 쓰이는 부분에 쓰기 좋은 파일 선택 디자인
 * @param {import('react').RefObject<Array>} ref 배열형 ref 객체
 * @param {number} i 배열형 ref 에 위치시킬 index
 * @returns 파일 선택 디자인
 */
export default function AddNewFileInput({ref, i}) {
	const random = Math.random() * 89 + 10;
	const property = ref?.current ? {ref: (e) => ref.current[i] = e} : {};

	return (
		<div key={'attachCol_' + random} className='flex'>
			<input type="text" key={'attachName_' + random} className={`${css.form_value}`} readOnly style={{ marginRight: '5px' }} />
			<input type="file" key={'attach_' + random} {...property} onChange={(e) => fileHandler(e)} accept='image/*' hidden />
			<Button key={'fileBtn_' + random} variant='outline-secondary' className={`${css.form_value}`} style={{ width: 'auto', marginLeft: '5px' }} onClick={() => ref?.current?.[i]?.click()}>파일 선택</Button>
		</div>
	);
}

/**
 * 파일 선택시 선택한 파일명 출력
 * @param {import('react').ChangeEvent<HTMLInputElement>} event 
 */
function fileHandler(event) {
	event.preventDefault();
	event.target.previousSibling.value = XSSConverter(event.target?.files[0]?.name) || '';
}
