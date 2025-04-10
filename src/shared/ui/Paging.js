import PagingOption from "@/shared/model/PagingOption";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Pagination } from "react-bootstrap";
import { combineURLSearchParams } from "../lib/SearchParamsUtility";

/**
 * 페이징 ui
 * @description allCount를 필수로 담긴 Plain Object를 제공 할 것
 */
export default function Paging({defaultOption}) {
	const router = useRouter();
	const staticSearchParams = useSearchParams();
	const pagingOption = new PagingOption({...defaultOption, ...Object.fromEntries(staticSearchParams)});

	/**
	 * 페이지 이동 처리
	 * @param {number} pageNum 가고자 하는 페이지 번호
	 */
	function forwarder(pageNum) {
		const url = combineURLSearchParams(staticSearchParams, {currentPage: pageNum > 0 ? pageNum : 1});
		router.push(`?${url.toString()}`);
	}

	const pageItemMaker = useCallback((pagingOption) => {
		const frontHidden = {hidden: pagingOption.getCurrentPage() <= 1};
		const behindHidden = {hidden: pagingOption.getCurrentPage() >= pagingOption.getMaxPage()};
		const items = [];

		items.push(<Pagination.First key={'firstItem'} {...frontHidden} onClick={() => forwarder(1)} />);
		items.push(<Pagination.Prev key={'prevItem'} {...frontHidden} onClick={() => forwarder(pagingOption.getCurrentPage() - 1)} />);

		for (let i = pagingOption.getStartPage(); i <= pagingOption.getEndPage(); i++) {
			items.push(<Pagination.Item key={'pageItem'+i} active={i == pagingOption.getCurrentPage()} onClick={() => forwarder(i)}>
				{i}
			</Pagination.Item>);
		}

		items.push(<Pagination.Next key={'nextItem'} {...behindHidden} onClick={() => forwarder(pagingOption.getCurrentPage() + 1)} />);
		items.push(<Pagination.Last key={'lastItem'} {...behindHidden} onClick={() => forwarder(pagingOption.getMaxPage())} />);
		return items;
	}, []);

	return (<>
		<Pagination className="flex" style={{justifyContent: 'center'}}>{pageItemMaker(pagingOption)}</Pagination>
	</>);
}