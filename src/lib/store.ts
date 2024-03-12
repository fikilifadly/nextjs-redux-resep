import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./recipe";

export const store = () => {
	return configureStore({
		reducer: {
			recipe: recipeSlice,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default store;
