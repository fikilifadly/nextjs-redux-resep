import { Recipe } from "@/lib/recipe";
import React from "react";
import { useSelector } from "react-redux";

const ListIngredients = () => {
	const { ingredients } = useSelector((state: any) => state.recipe);

	return (
		<div className="p-10 shadow-lg bg-white rounded-lg w-full h-full flex flex-col gap-2">
			<h1 className="text-3xl font-bold text-pink-700">List Bahan</h1>

			{ingredients.length > 0 ? (
				ingredients.map((ingredient: string, i: number) => (
					<p key={ingredient}>
						{i + 1}. <span className="font-bold">{ingredient}</span>
					</p>
				))
			) : (
				<p>Tidak ada bahan tersisa</p>
			)}
		</div>
	);
};

export default ListIngredients;
