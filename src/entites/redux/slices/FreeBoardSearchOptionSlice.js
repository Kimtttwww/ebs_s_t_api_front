import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const mouth = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const defaultStartDate = today.getFullYear() - 1 + `-${mouth}-${day}`
const defaultEndDate = today.getFullYear() + `-${mouth}-${day}`

const FreeBoardSearchOptionSlice = createSlice({
	name: "freeBoardSearchOption",
	initialState: {
		startDate: defaultStartDate,
		endDate: defaultEndDate,
		category: 0,
		query: "",
		allCount: 0,
		perRange: 10,
		perPage: 10,
		currentPage: 1,
		maxPage: 0,
		startPage: 0,
		endPage: 0
	},
	reducers: {
		// setStartDate: (state, action) => {
		// 	state.startDate = action.payload.startDate;
		// },
		// setEndDate: (state, action) => {
		// 	state.endDate = action.payload.endDate;
		// },
		// setCategory: (state, action) => {
		// 	state.category = parseInt(action.payload.category);
		// },
		// setQuery: (state, action) => {
		// 	state.query = action.payload.query;
		// },
		// setPerRange: (state, action) => {
		// 	state.perRange = parseInt(action.payload.perRange);
		// 	updateStartEndPage(state);
		// },
		// setPerPage: (state, action) => {
		// 	state.perPage = parseInt(action.payload.perPage);
		// 	updateMaxPage(state);
		// },
		// setAllCount: (state, action) => {
		// 	state.allCount = parseInt(action.payload.allCount);
		// 	updateMaxPage(state);
		// },
		// setCurrentPage: (state, action) => {
		// 	state.currentPage = parseInt(action.payload.currentPage);
		// 	if (state.currentPage < 1) state.currentPage = 1;
		// 	updateStartEndPage(state);
		// },
		setFBSO: (state, action) => {
			state.startDate = action.payload.startDate || defaultStartDate;
			state.endDate = action.payload.endDate || defaultEndDate;
			state.category = action.payload.category;
			state.query = action.payload.query;
			state.perRange = parseInt(action.payload.perRange) || state.perRange;
			state.perPage = parseInt(action.payload.perPage) || state.perPage;
			state.allCount = parseInt(action.payload.allCount) || state.allCount;
			state.currentPage = parseInt(action.payload.currentPage) || state.currentPage;
			updateMaxPage(state);
		}
	}
});

/**
 * 최대 페이지 재계산
 * @param {FreeBoardSearchOptionSilce} state 
 */
function updateMaxPage(state) {
	try {
		let mp = parseInt(state.allCount / state.perPage);
		state.maxPage = (state.allCount % state.perPage) > 0 ? mp + 1 : mp || state.maxPage;
		updateStartEndPage(state);
	} catch (e) {
		state.maxPage = 0;
	}
}

/**
 * 시작 번호, 끝 번호 재계산
 * @param {FreeBoardSearchOptionSilce} state 
 */
function updateStartEndPage(state) {
	state.startPage = parseInt((state.currentPage - 1) / state.perRange) + 1 || state.startPage;
	state.endPage = state.startPage + state.perRange - 1 || state.endPage;
	if (state.endPage > state.maxPage) state.endPage = state.maxPage;
}

export const {
	// setStartDate,
	// setEndDate,
	// setCategory,
	// setQuery,
	// setPerRange,
	// setPerPage,
	// setAllCount,
	// setCurrentPage,
	setFBSO
} = FreeBoardSearchOptionSlice.actions;
export default FreeBoardSearchOptionSlice.reducer;