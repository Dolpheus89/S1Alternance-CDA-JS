import { useQuery } from "@apollo/client"
import AdCard from "../../../components/AdCard"
import { useRouter } from "next/router"
import { useState } from "react"
import { GET_ADS_BY_TITLE_QUERY } from "@/graphql-queries/ads"
import { Ads } from "@/__generated__/graphql"

const SearchPage = () => {
    const router = useRouter()
    const [total, setTotal] = useState(0)
    const { data, loading, error } = useQuery(GET_ADS_BY_TITLE_QUERY, {
        variables: { title: router.query.search },
    })
    const addPrice = (price: number) => {
        setTotal(total! + price)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error : {error.message}</p>
    }

    const ads: Ads[] = [...data.getAdByTitle]
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
