import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fbsoSlice from "./slices/FreeBoardSearchOptionSlice";

const store = configureStore({
	reducer: combineReducers({
		freeBoardSearchOption: fbsoSlice
	})
});

export default store;
