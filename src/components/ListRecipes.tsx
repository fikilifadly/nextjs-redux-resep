import { Recipe, deleteRecipe, setCurrentEdit, toggleEdit, toggleShow } from "@/lib/recipe";
import { Span } from "next/dist/trace";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const ListRecipes = () => {
	const { recipes } = useSelector((state: any) => state.recipe);

	const dispatch = useDispatch();

	const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, i: number) => {
		const { dataset } = event.target as HTMLButtonElement;

		toast((t) => {
			return (
				<div className="flex flex-col gap-3">
					<span>
						Apakah anda yakin ingin menghapus <b>{dataset.name}</b>?
					</span>
					<div className="flex justify-end gap-5">
						<button
							className="bg-red-500 text-white py-2 px-10 text-sm rounded-lg shadow-md"
							onClick={() => {
								dispatch(deleteRecipe(dataset.name as string));
								toast.success(`${dataset.name} Berhasil dihapus`);
								toast.remove(t.id);
							}}
						>
							Yes
						</button>
						<button className="bg-black text-white py-2 px-10 text-sm rounded-lg shadow-md" onClick={() => toast.remove(t.id)}>
							No
						</button>
					</div>
				</div>
			);
		});
	};

	const handleEdit = (event: React.MouseEvent<HTMLButtonElement>, i: number) => {
		const { dataset } = event.target as HTMLButtonElement;

		console.log(dataset.name);
		dispatch(setCurrentEdit(dataset.name as string));
		dispatch(toggleEdit(true));
		dispatch(toggleShow());
	};

	return (
		<div className="bg-white rounded-lg w-full h-full flex flex-col gap-5">
			<h1 className="text-3xl font-bold">List Resep</h1>
			<table className="table-fixed">
				<thead className="border border-gray-300 rounded">
					<tr className="bg-gray-200 text-gray-600 text-center text-sm font-bold uppercase tracking-wider">
						<th>No</th>
						<th>Nama Resep</th>
						<th>Bahan</th>
						<th>Tata Cara</th>
						<th>Gambar</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody className="border border-gray-300 rounded text-center text-sm ">
					{recipes.length > 0 ? (
						recipes.map((recipe: Recipe, i: number) => (
							<>
								<tr className="border border-gray-300 rounded" key={i}>
									<td>{i + 1}</td>
									<td>{recipe.name}</td>
									<td>
										<div className="flex flex-col gap-2">
											{recipe.ingredients.length > 0
												? recipe.ingredients.map((ingredient, index) => (
														<span key={index}>{ingredient.bahan ? index + 1 + ". " + ingredient.bahan + " - " + ingredient.satuan : ""}</span>
												  ))
												: "Tidak Ada Bahan"}
										</div>
									</td>
									<td>
										<div className="flex flex-col gap-2">
											{recipe.cara.length > 0 ? recipe.cara.map((cara, index) => <span key={index}>{cara ? index + 1 + ". " + cara : ""}</span>) : "Tidak Ada Tata Cara"}
										</div>
									</td>
									<td>
										<Image
											src={
												recipe.image
													? recipe.image
													: "data:image/jpeg;base64,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"
											}
											alt={recipe.name}
											width={50}
											height={50}
											className="rounded"
										/>
									</td>
									<td>
										<div className="flex gap-3 justify-center items-center">
											<button className="bg-blue-500  text-white py-1 px-5 text-sm rounded-lg shadow-md  h-fit" data-name={recipe.name} onClick={(event) => handleEdit(event, i)}>
												Edit
											</button>
											<button className="bg-red-500 text-white py-1 px-5 text-sm rounded-lg shadow-md  h-fit" data-name={recipe.name} onClick={(event) => handleDelete(event, i)}>
												Delete
											</button>
										</div>
									</td>
								</tr>
							</>
						))
					) : (
						<tr>
							<td colSpan={6} className="text-center text-red-600 my-5 text-2xl font-bold">
								TIdak Ada Resep Tersedia
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default ListRecipes;
