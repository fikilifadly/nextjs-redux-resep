"use client";
import ListIngredients from "@/components/ListIngredients";
import ListRecipes from "@/components/ListRecipes";
import TableRecipe from "@/components/TableRecipe";
import { toggleEdit, toggleShow } from "@/lib/recipe";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
	const { isShow } = useSelector((state: any) => state.recipe);
	const dispatch = useDispatch();

	const showHandler = () => {
		dispatch(toggleEdit(false));
		dispatch(toggleShow());
	};

	return (
		<>
			<aside className="w-2/5">
				<ListIngredients />
			</aside>
			<main className="w-full">
				<div className="p-10 shadow-lg bg-white rounded-lg w-full h-full flex flex-col gap-5 overflow-auto">
					<div className="flex gap-5">
						<button className={`${isShow ? "bg-gray-700" : "bg-green-500"} text-white px-4 py-2 rounded`} onClick={showHandler}>
							{!isShow ? "Add Resep" : "List Resep"}
						</button>
					</div>
					<div className="flex flex-col justify-center place-items-center">{isShow ? <TableRecipe /> : <ListRecipes />}</div>
				</div>
			</main>
			<Toaster />
		</>
	);
}
