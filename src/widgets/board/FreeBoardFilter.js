import css from "@/entites/board/css/free_board_filter.module.css";
import FreeBoardSearchOption from "@/entites/board/model/FreeBoardSearchOption";
import { getCategoryList } from "@/features/board/api/FreeBoardGetAPI";
import { combineURLSearchParams } from "@/shared/lib/SearchParamsUtility";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, FormControl, FormSelect } from "react-bootstrap";

export default function FreeBoardFilter() {
	const inputs = useRef({});
	const router = useRouter();
	const staticSearchParams = useSearchParams();
	const [categorys, setCategorys] = useState([]);
	const searchOption = new FreeBoardSearchOption(Object.fromEntries(staticSearchParams));

	useEffect(() => {(async () => setCategorys(await getCategoryList()))()}, []);

	useEffect(() => {
		if (inputs?.current['category']) inputs.current['category'].value = staticSearchParams.get('category') || '';
	});

	/**
	 * 검색 처리
	 * @param {FormDataEvent} event 사용자의 검색 요청
	 */
	function searching(event) {
		event.preventDefault();
		const newSearchOption = {currentPage: 1};

		Object.entries(inputs.current).forEach(([key, value]) => {
			newSearchOption[key] = value.value;
		});

		const url = combineURLSearchParams(staticSearchParams, newSearchOption);
		console.log(url.toString());
		
		router.push(`?${url.toString()}`);
	}

	return (<>
		<form className={'flex'} onSubmit={(e) => searching(e)} style={{ height: '50px', justifyContent: 'space-around', border: '1px solid lightgray', padding: '5px 10px' }}>
			<article className={`flex ${css.filter_box}`}>
				<label className={`${css.filter_element}`} style={{ width: '50px' }}>등록일</label>
				<FormControl type="date" ref={e => inputs.current['startDate'] = e} defaultValue={searchOption.startDate} className={`${css.filter_input} ${css.filter_element}`} />
				<label className={`${css.filter_element}`}>-</label>
				<FormControl type="date" ref={e => inputs.current['endDate'] = e} defaultValue={searchOption.endDate} className={`${css.filter_input} ${css.filter_element}`} />
			</article>
			<article className={`flex ${css.filter_box}`}>
				<FormSelect ref={e => inputs.current['category'] = e} className={`${css.filter_element}`} defaultValue={searchOption.category} style={{width: '180px'}}>
					<option value={''}>전체 카테고리</option>
					{categorys?.length && categorys.map((c) => (
						<option key={'category' + c.categoryNo} value={c.categoryNo}>{c.name}</option>
					))}
				</FormSelect>
				<FormControl ref={e => inputs.current['query'] = e} defaultValue={searchOption.query} className={`${css.filter_element}`} placeholder="검색어를 입력해 주세요 (제목+작성자+내용)" style={{ width: '400px' }} />
				<Button type="submit" variant="secondary" className={`${css.filter_element}`}>검색</Button>
			</article>
		</form>
	</>);
}