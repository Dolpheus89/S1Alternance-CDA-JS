import axios from "axios"
import { useState, useEffect } from "react"
import Link from "next/link"

const Navigation = () => {
    const [categories, setCategories] = useState([
        {
            name: "Meubles",
            id: 99,
        },
    ])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    "http://localhost:3010/categories/"
                )
                setCategories(result.data)
            } catch (err) {
                console.log("error", err)
            }
        }
        fetchData()
    }, [])

    return (
        <nav className="categories-navigation">
            {categories.map((category) => (
                <Link
                    href={`/filter/${category.name}`}
                    key={category.id}
                    className="category-navigation-link"
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    )
}

export default Navigation
