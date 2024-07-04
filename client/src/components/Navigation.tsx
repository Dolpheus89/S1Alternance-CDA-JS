import Link from "next/link"
import { useQuery } from "@apollo/client"
import { GET_ALL_CATEGORIES_QUERY } from "@/graphql-queries/categories"
import { Categories } from "@/__generated__/graphql"

const Navigation = () => {
    const { data, loading, error } = useQuery(GET_ALL_CATEGORIES_QUERY)

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error : {error.message}</p>
    }

    const categories: Categories[] = [...data.getAllCategories]

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
