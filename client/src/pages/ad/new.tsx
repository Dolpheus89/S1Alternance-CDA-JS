import axios from "axios"
import { useState, useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type category = {
    id: number
    name: string
}

type formData = {
    title: string
    owner: string
    category: string
    price: number
    location: string
    description: string
}

const NewAD = () => {
    const [categories, setCategories] = useState<category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("")

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await axios.get<category[]>(
                "http://localhost:3010/categories/"
            )
            setCategories(result.data)
        }
        fetchCategories()
    }, [])

    const { register, handleSubmit, reset } = useForm<formData>()

    const onSubmit: SubmitHandler<formData> = async (data) => {
        try {
            const response = await axios.post(
                "http://localhost:3010/ads/",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            console.log(response, data)
        } catch (err) {
            console.error("Error:", err)
        }

        reset()
    }

    const selectCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)

        setSelectedCategory(e.target.value)
    }

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
