import { Bahan, deleteContainerBahan, deleteContainerCara, setContainerBahan, setContainerCara } from "@/lib/recipe";
import React, { MouseEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const DynamicInput = () => {
	const { containerBahan, containerCara, ingredients, isAddBahan } = useSelector((state: any) => state.recipe);
	const dispatch = useDispatch();

	const handleAddInput = (event: MouseEvent<HTMLButtonElement>, index: number) => {
		const { name } = event.target as HTMLButtonElement;
		if (name == "bahan") {
			if (ingredients.length == 0) {
				return toast.error("Bahan Habis");
			}

			const inputIngredients = document.querySelectorAll("select[name='bahan']");
			const satuanIngredientsValue = document.querySelectorAll("input[name='satuantakaran']");
			const satuanIngredients = document.querySelectorAll("select[name='takaran']");
			const lastInputIngredient = (inputIngredients[inputIngredients.length - 1] as HTMLInputElement)?.value;
			const lastSatuanIngredient = satuanIngredientsValue[satuanIngredientsValue.length - 1] as HTMLInputElement;
			const lastSatuanIngredientValue = lastSatuanIngredient?.value;
			const lastSatuanIngredientType = (satuanIngredients[satuanIngredients.length - 1] as HTMLInputElement)?.value;
			const berat = lastSatuanIngredientValue + " " + lastSatuanIngredientType;

			if (lastSatuanIngredientValue.trim() == "") {
				toast.error("Satuan Bahan tidak boleh kosong");
				lastSatuanIngredient.focus();
			} else {
				console.log(lastInputIngredient, berat, "====== DynamicInput");
				dispatch(setContainerBahan([lastInputIngredient, berat]));
			}
		}
	};

	const handleDelete = (event: MouseEvent<HTMLButtonElement>, index: number) => {
		const { name } = event.target as HTMLButtonElement;
		if (name == "bahan") {
			dispatch(deleteContainerBahan(index));
		} else {
			dispatch(deleteContainerCara(index));
		}
	};

	return (
		<div className="container">
			<div className="flex justify-between">
				<span className="font-bold">Bahan: </span>
				{isAddBahan && (
					<button type="button" className="bg-green-500 text-white py-2 px-10 text-sm rounded-lg shadow-md w-[125px] h-fit">
						Add
					</button>
				)}
			</div>
			{containerBahan.map((bahan: Bahan, i: number) => (
				<div className="flex flex-col justify-center my-3" key={i}>
					<div className="flex justify-between">
						{i === containerBahan.length - 1 ? (
							<div className="flex gap-5">
								{ingredients.length == 0 ? (
									<span className="text-red-500 font-bold">Bahan Habis Silahkan Hapus Resep Yang Sudah Ada</span>
								) : (
									<>
										<div className="flex gap-3 items-center">
											<select name="bahan" className="w-full p-2 border border-gray-300 rounded h-fit">
												{ingredients.map((ingredient: string) => (
													<option key={ingredient} value={ingredient}>
														{ingredient}
													</option>
												))}
											</select>
										</div>
										<div className="flex gap-3 ">
											<input
												name="satuantakaran"
												placeholder="satuan bahan makanan"
												type="number"
												className="w-full p-2 border border-gray-300 rounded h-fit"
												defaultValue={bahan.satuan.split(" ")[0]}
											/>
											<select name="takaran" className="w-fit p-2 border border-gray-300 rounded h-fit" defaultValue={bahan.satuan.split(" ")[1]}>
												{["kg", "sdm", "sdt", "gr", "butir"].map((takaran: string, i: number) => (
													<option key={i} value={takaran}>
														{takaran}
													</option>
												))}
											</select>
										</div>
									</>
								)}
							</div>
						) : (
							<div className="w-full flex justify-between">
								<span>
									{i + 1}. {bahan.bahan} - {bahan.satuan}
								</span>
								{i === containerBahan.length - 2 && (
									<button
										type="button"
										className="bg-red-500 text-white py-2 px-10 text-sm rounded-lg shadow-md w-[125px] h-fit"
										name="bahan"
										onClick={(event) => handleDelete(event, i)}
									>
										Delete
									</button>
								)}
							</div>
						)}

						{ingredients.length != 0 && (
							<div className="flex gap-3">
								{i === containerBahan.length - 1 && (
									<button
										type="button"
										onClick={(event) => handleAddInput(event, i)}
										name="bahan"
										className="bg-green-500 text-white py-2 px-10 text-sm rounded-lg shadow-md w-[125px] h-fit"
									>
										Add
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			))}

			<div className="flex justify-between">
				<span className="font-bold">Tata Cara</span>
				{/* <button type="button" className="bg-green-500 text-white py-2 px-10 text-sm rounded-lg shadow-md w-[125px] h-fit">
					Add
				</button> */}
			</div>
			{containerCara.map((cara: string, i: number) => (
				<div className="flex flex-col justify-center my-3" key={i}>
					<div className="flex gap-10 justify-between">
						{i === containerCara.length - 1 ? (
							<div className="flex w-full gap-10">
								<div id="cara" key={i}>
									<input
										onKeyUp={(event) => {
											event.preventDefault();
											const { key, target } = event;
											const value = (target as HTMLInputElement)?.value;

											if (key === "Enter") {
												if (!value) {
													toast.error("Tata Cara tidak boleh kosong");
												} else {
													dispatch(setContainerCara((target as HTMLInputElement)?.value.trim()));
												}
											}
										}}
										type="text"
										name="cara"
										className="w-full border border-gray-300 rounded p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ring-1 ring-gray-300"
									/>
								</div>
							</div>
						) : (
							<div className="flex w-full justify-between">
								<span>
									{i + 1}. {cara}
								</span>
								{i === containerCara.length - 2 && (
									<button
										type="button"
										className="bg-red-500 text-white py-2 px-10 text-sm rounded-lg shadow-md w-[125px] h-fit"
										name="cara"
										onClick={(event) => handleDelete(event, i)}
									>
										Delete
									</button>
								)}
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default DynamicInput;
