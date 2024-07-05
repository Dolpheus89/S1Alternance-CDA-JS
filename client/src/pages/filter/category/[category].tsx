import { useRouter } from "next/router"
import AdCard, { AdCardProps } from "../../../components/AdCard"
import { useState } from "react"
import { useGetAdsByCategoryQuery } from "@/__generated__/graphql"

const FilteredByCategory = () => {
    const [total, setTotal] = useState(0)
    const router = useRouter()
    const { data, loading, error } = useGetAdsByCategoryQuery({
        variables: { name: router.query.category as string },
    })

    const addPrice = (price: number) => {
        setTotal(total! + price)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || !data) {
        return <p>Error : {error ? error.message : "No Data available"}</p>
    }

    const ads: AdCardProps[] = data.getAdsByCategory
    return (
        <>
            <h2>{router.query.category} :</h2>
            <p>Prix total: {total} €</p>
            <section className="recent-ads">
                {ads.map((ad, index) => (
                    <div key={index}>
                        <AdCard {...ad} />
                        <button
                            className="button"
                            onClick={() => {
                                addPrice(ad.price)
                            }}
                        >
                            Add price to total
                        </button>
                    </div>
                ))}
            </section>
        </>
    )
}

export default FilteredByCategory
