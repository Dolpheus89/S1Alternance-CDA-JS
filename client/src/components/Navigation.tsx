import Link from "next/link"
import { useGetAllCategoriesQuery } from "@/__generated__/graphql"

export type displayCategories = {
    id: string
    name: string
}

const Navigation = () => {
    const { data, loading, error } = useGetAllCategoriesQuery()

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || !data) {
        return <p>Error : {error ? error.message : "No Data available"}</p>
    }

    const categories: displayCategories[] = [...data.getAllCategories]

    return (
        <nav className="categories-navigation">
            {categories.map((category) => (
                <Link
                    href={`/filter/category/${category.name}`}
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
