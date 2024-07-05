import AdCard, { AdCardProps } from "../../../components/AdCard"
import { useRouter } from "next/router"
import { useState } from "react"
import { useGetAdsByTitleQuery } from "@/__generated__/graphql"

const SearchPage = () => {
    const router = useRouter()
    const [total, setTotal] = useState(0)
    const { data, loading, error } = useGetAdsByTitleQuery({
        variables: { title: router.query.title as string },
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

    const ads: AdCardProps[] = [...data.getAdByTitle]

    return (
        <>
            <h2>Resultat de la recherche "{router.query.search}"</h2>
            {ads.length < 1 ? (
                <p>No results, try again...</p>
            ) : (
                <p>Prix total: {total} €</p>
            )}
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

export default SearchPage
