import React, { FormEvent, FormEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicInput from "./DynamicInput";
import Image from "next/image";
import { Recipe, addRecipe, editRecipe, toggleEdit, toggleShow } from "@/lib/recipe";
import toast from "react-hot-toast";

const TableRecipe = () => {
	const { isEdit, containerBahan, containerCara, recipes, currentEdit } = useSelector((state: any) => state.recipe);
	const dispatch = useDispatch();

	const submitHandler = () => {
		const name = document.querySelector("input[name='resep']") as HTMLInputElement;
		const fileInput = document.getElementById("image") as HTMLInputElement | null;
		const image = fileInput?.files && fileInput.files[0].name;

		if (!name?.value.trim()) {
			name.focus();
			return toast.error("Nama Resep tidak boleh kosong");
		}

		if (!isEdit) {
			let recipe: Recipe = {
				name: name.value,
				ingredients: containerBahan,
				cara: containerCara,
			};

			if (image !== null && image !== undefined) {
				recipe["image"] = image;
			}

			dispatch(addRecipe(recipe));
		} else {
			let recipe: Recipe = {
				name: name.value,
				ingredients: containerBahan,
				cara: containerCara,
			};

			if (image !== null && image !== undefined) {
				recipe["image"] = image;
			}

			dispatch(editRecipe(recipe));
			dispatch(toggleEdit(false));
			dispatch(toggleShow());
		}
	};

	return (
		<div
			className="w-full flex flex-col gap-2 overflow-auto pb-5"
			onKeyUp={(e) => {
				e.preventDefault();
				if (e.key === "Enter") {
					console.log("masuk 2");
					return false;
				}
			}}
		>
			<h1 className="text-2xl">{isEdit == false ? "Add Resep" : `Edit Resep`}</h1>
			<div className="w-full flex flex-col gap-2">
				<label htmlFor="resep">Nama Resep</label>
				<input
					id="imageresep"
					name="resep"
					type="text"
					className="w-full border border-gray-300 rounded p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ring-1 ring-gray-300"
					placeholder="Masukkan Nama Resep"
					defaultValue={isEdit ? currentEdit.name : ""}
				/>
			</div>
			<div className="w-full flex flex-col gap-2">
				<label htmlFor="resep">Image Resep</label>
				<div className="flex gap-5 items-center">
					<Image
						src={
							isEdit
								? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAAAQIEBQMGB//EADYQAAIBAwEEBQsEAwEAAAAAAAABAgMEESEFEhMxIkFTYXIUFTI0QlFxkbHR8DM1VIEjweFD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3EERQAAAAAACFAAEAoIAKQoYEAAApAAAAAAAUEAAAAUhQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgFBABQQAUEAFAIBQQAUEAFJkGntC9jax3Y61ZckBnd3tK2lGM8uUnyRsp5Rz7CxcZ+U3T3q0tdfZOgBQQAUEAFBABQAAAAAAAaV5tCna1VTlCUm1nQ8PPNLsqgu8+ebZZ0x9zpaIDm+eaXZVB55pdlMl1tWFOo4UYKbTw22elltKFeoqc4KEn6PuYGHnil2Uy+eaPZTN6tUjRpSqTxiKyY2teNzRjUiks817gNPzzS7KZPPNLspnTx8PkMfD5AczzzS7KY88UuyqHSx8Pkam0L2NtHdhiVWWkYgYXO0VToJqDVWfow6zTpSp2lXi3SlVuJa4Wu6jbsLJqXlFzmVZ6re9k6GAOZ54pL/yqHRpVFUpxmlhSWcGntlYsZeJfU2LP1Wl4EB7AAAAAAAAoIAKAAAAA5V3+9W3h+50Lje4NTd57rNC7/erb4fc6mAPkeWhlDe347uXLe0x7zsXWyY1ajnRnuNvLTWUYK0p7OpSuKlTiVFpHqWQMNsXO/UVvHlHWT7zy2RdcGvw5vo1NM95oyk5ycpPLb1HLXl3+4D6wpp7OuVcW6cn046SRL+9Vst2K3qsvRigF/fK2jux6VWXoxR57PsnGXlFz0q0tdeobPspRflF10q0tUn7J0AKAANDbXqMvEvqbFn6rS8CNfbXqMvEvqbFn6rS8CA9wAABCgAABAEUAAAAAA5d3+823w+51Dl3f7zb/D7nTAHA2tcqtX4cX0IafFnT2lc+TUHj056RR88+/UCkI3obkIK1jGrVSdaX6dPHLvYHpbzlY03N5daoujT68e9m9YWcovyi66VaWqT9k58peSt1Kr3ruWuvsf8ATobIunXpOE5ZqQ631oDoHlWuKdGUI1JYc3hGdWcadOU5vEYrLZ83d3Erms6j5dS9yA+myU52yrzjU+FN/wCSPLvR0ANHbXqMvEvqbFn6rS8CNfbPqEvEvqbNp6rR8CA9QAAAAAAACggFBCgAABy7v95tvh9zptpLL0x1nMu/3q28P3MtsXPCpcKL6U+eOpAczaFw7m4lJPoR0ivcjXIbdOEbWCqVVvVpfp0/d3sBTpq2SqVVvVpfp08cu9mUpeS5nNqd1LXX2M/7LKTtW6lR793PXXXh/wDTS3nJty5t/MA3vScnzfPvPW2ru3rRqLqeq96PLIyB0NqXvHcadL9Nat+9nPxgZGQM6VSVGrGcNJLXJ9Ha143NGM4ae9e5nzOTa2fdu2rJtvhy0a/2B1Ns+oy8S+psWfqtLwI19stOwbT0comxZ+q0vAgPYoAEBQARCgACACggAoIAOTtGpGjtSjVnndjHXC+JjVu9n16jnUo1JSfX+M60qcJvMoRfxRpX9xRtoqMKcZVZPoxxy7wNavK1oU4ypUMVpejF6td7MKM6NpV4t23OvLXC13f+m3YWThLyi46VaWuH7JuulTfOEW/gByJV9mSeZUJt/wB/ccbZn8ef5/Z1+DS7OPyHBpdnH5Acjj7L/jz/AD+xx9l/x5/n9nX4NLs4/IcGl2cfkByONsz+PP8AP7HG2Z/Hn+f2dfg0uzj8hwaXZx+QHI42zP48/wA/sjrbL/jy+T+52ODS7OPyHBpdnH5Ace8vbepZ8ChGSxjGUdWz9VpeBGfBpdnH5GSSSSSwkBkAQCggAoAAAgApAAABQNPaF27WmlCLlOekVg8rCycZeUXPSrS1w/ZN9xTxlJ45ZMgICN41fIm9FQ3m0o4zkDIAkmopuTSS5tgUETzrlFAAMAAAAAKBAUgAAAAUAAAAAAAAAAAB5XH6NTws57bt7N02/wDHOl0G+p45HTklJOMtU9GYTo050uFOKcMYwwPCM6s5zjCooKmlzXN46+4s6zns6VbdWtLew9VyPWdtSm8uL5YeJNZXfjmZypxlTdNxW41jHcBpzq1E6zhJRVOnGSW78TPi1IVGqlVbrpued30eX3Pd0YPfzH01uy15oSoU5elHPR3efUBqK4qxVVKTluwU4uUcdfuErirCnUmpOUdFByjjVs9qtpBwlGGkppJuTbys8tSU7bWfEjFQkt1wTbT7wMqEqrqSjUUt3GU5LDNhcjzpUYUvRzn3yk39T0AoIUAAAABAKAAAIUAQpAAAAAFAhQABCkAAAAAVAQBgAAABQQAAAAAAFAAEKAICgCAoAgKAICgCAoAgKAIUACAoAgKAIUACAoA//9k="
								: "data:image/jpeg;base64,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"
						}
						id="image"
						className="object-cover"
						width={100}
						height={100}
						alt=""
					/>
					<input name="resep" type="file" className="w-full border border-gray-300 rounded p-2 h-fit" />
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<DynamicInput />
			</div>
			<button className="bg-green-500 text-white px-4 py-2 rounded w-full shadow-md" onClick={submitHandler}>
				Submit
			</button>
		</div>
	);
};

export default TableRecipe;
