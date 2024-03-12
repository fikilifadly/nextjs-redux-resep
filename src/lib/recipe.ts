import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Recipe = {
	name: string;
	ingredients: Bahan[];
	cara: string[];
	image?: string;
};

export type Bahan = {
	bahan: string;
	satuan: string;
};

export interface InitialState {
	recipes: Recipe[];
	ingredients: string[];
	isEdit: boolean;
	currentEdit: Recipe;
	isShow: boolean;
	isAddBahan: boolean;
	isAddCara: boolean;
	containerBahan: Bahan[];
	containerCara: string[];
}

const initialState = {
	recipes: [],
	ingredients: ["Apel", "Garam", "Tepung Terigu", "Ayam", "Kecap Manis", "Telur", "Gula", "Kecap Asin"],
	isEdit: false,
	currentEdit: {} as Recipe,
	isAddBahan: false,
	isAddCara: false,
	isShow: false,
	containerBahan: [
		{
			bahan: "",
			satuan: "",
		},
	],
	containerCara: [""],
} satisfies InitialState as InitialState;

const recipeSlice = createSlice({
	name: "recipe",
	initialState,
	reducers: {
		setContainerBahan(state, action: PayloadAction<string[]>) {
			const bahanLength = state.containerBahan.length;

			state.containerBahan[bahanLength - 1].bahan = action.payload[0];
			state.containerBahan[bahanLength - 1].satuan = action.payload[1];

			state.ingredients = state.ingredients.filter((ingredient) => ingredient !== action.payload[0]);

			state.containerBahan.push({
				bahan: "",
				satuan: "",
			});
		},
		deleteContainerBahan(state, action: PayloadAction<number>) {
			state.ingredients.push(state.containerBahan[action.payload].bahan);
			state.containerBahan = state.containerBahan.filter((_, i) => i !== action.payload);
		},
		setContainerCara(state, action: PayloadAction<string>) {
			const containerCaraLength = state.containerCara.length;

			state.containerCara[containerCaraLength - 1] = action.payload;
			state.containerCara.push("");
		},
		deleteContainerCara(state, action: PayloadAction<number>) {
			state.containerCara = state.containerCara.filter((_, i) => i !== action.payload);
		},
		setCurrentEdit(state, action: PayloadAction<string>) {
			state.currentEdit = state.recipes.filter((recipe) => recipe.name === action.payload)[0];
			state.containerBahan = state.currentEdit.ingredients;
			state.containerCara = state.currentEdit.cara;
		},
		addRecipe(state, action: PayloadAction<Recipe>) {
			state.recipes.push(action.payload);
			state.containerBahan = [
				{
					bahan: "",
					satuan: "",
				},
			];
			state.containerCara = [""];
			state.isShow = !state.isShow;
		},
		editRecipe(state, { payload: editedRecipe }: PayloadAction<Recipe>) {
			state.recipes = state.recipes.map((recipe) => (recipe.name === state.currentEdit.name ? { ...recipe, ...editedRecipe } : recipe));

			state.containerBahan = [
				{
					bahan: "",
					satuan: "",
				},
			];
			state.containerCara = [""];
		},
		deleteRecipe(state, { payload: targetName }: PayloadAction<string>) {
			state.ingredients = [...state.ingredients, ...state.recipes.filter((recipe) => recipe.name === targetName)[0].ingredients.map((ingredient) => ingredient.bahan)];
			state.recipes = state.recipes.filter((recipe, i) => recipe.name !== targetName);
		},
		toggleEdit(state, { payload: targetName }: PayloadAction<boolean>) {
			state.isEdit = targetName;
		},
		toggleShow(state) {
			state.isShow = !state.isShow;
		},
		toggleAddBahan(state) {
			state.isAddBahan = !state.isAddBahan;
		},
		toggleAddCara(state) {
			state.isAddCara = !state.isAddCara;
		},
	},
});

export const {
	setContainerBahan,
	deleteContainerBahan,
	setContainerCara,
	deleteContainerCara,
	setCurrentEdit,
	addRecipe,
	editRecipe,
	deleteRecipe,
	toggleEdit,
	toggleShow,
	toggleAddBahan,
	toggleAddCara,
} = recipeSlice.actions;

export default recipeSlice.reducer;
