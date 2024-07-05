import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import {
    useAddAdMutation,
    useGetAllCategoriesQuery,
} from "@/__generated__/graphql"
import { AdsInput } from "@/__generated__/graphql"
import { displayCategories } from "@/components/Navigation"

const NewAD = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const {
        data: categoriesResult,
        loading: categoriesLoading,
        error: categoriesError,
    } = useGetAllCategoriesQuery()

    const [postAd, { loading, data, error }] = useAddAdMutation()

    const { register, handleSubmit, reset } = useForm<AdsInput>()

    const onSubmit: SubmitHandler<AdsInput> = async (data) => {
        console.log("Submitting data:", data)
        try {
            const adData: AdsInput = {
                ...data,
                price: Number(data.price),
                category: { name: data.category as string },
            }
            const response = await postAd({
                variables: {
                    adData,
                },
            })

            console.log(response)
        } catch (err) {
            console.error("Error:", err)
        }

        reset()
    }

    const selectCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)

        setSelectedCategory(e.target.value)
    }

    if (categoriesLoading) {
        return <p>Loading...</p>
    }

    if (categoriesError || !categoriesResult) {
        return (
            <p>
                Error:{" "}
                {categoriesError
                    ? categoriesError.message
                    : "No Data available"}
            </p>
        )
    }

    console.log("mutation data", loading, data, error)
    const categories: displayCategories[] = categoriesResult.getAllCategories

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="newAd">
            <label>
                Titre de l'annonce : <br />
                <input
                    className="text-field"
                    type="text"
                    placeholder="title"
                    {...register("title", { max: 100, min: 5, required: true })}
                />
            </label>
            <label>
                Propriétaire: <br />
                <input
                    className="text-field"
                    type="text"
                    placeholder="owner"
                    {...register("owner", { max: 100, required: true })}
                />
            </label>
            <label>
                Categorie : <br />
                {selectedCategory === "new" ? (
                    <label>
                        <input
                            className="text-field"
                            type="text"
                            placeholder="new category..."
                            {...register("category", {})}
                        />
                    </label>
                ) : (
                    <select
                        {...register("category")}
                        className="text-field"
                        onChange={selectCategories}
                    >
                        <option value="..." disabled>
                            Choose a category
                        </option>
                        {categories.map((el) => (
                            <option value={el.name} key={el.id}>
                                {el.name}
                            </option>
                        ))}
                        <option value={"new"}>Ajout d'une categorie</option>
                    </select>
                )}
            </label>
            <label>
                Prix : <br />
                <input
                    className="text-field"
                    type="number"
                    placeholder="price"
                    {...register("price", { required: true })}
                />
            </label>
            <label>
                Localisation : <br />
                <input
                    className="text-field"
                    type="text"
                    placeholder="location"
                    {...register("location", {})}
                />
            </label>
            <label>
                Description : <br />
                <textarea
                    className="text-field"
                    {...register("description", {})}
                />
            </label>

            <button className="button" type="submit">
                Submit
            </button>
        </form>
    )
}

export default NewAD
