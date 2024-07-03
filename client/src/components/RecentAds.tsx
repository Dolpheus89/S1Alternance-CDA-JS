import AdCard, { AdCardProps } from "./AdCard"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_ALL_ADS_QUERY } from "@/graphql-queries/ads"

export default function RecentAds() {
    const [total, setTotal] = useState(0)
    const { data, loading, error } = useQuery(GET_ALL_ADS_QUERY)

    const addPrice = (price: number) => {
        setTotal(total! + price)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error : {error.message}</p>
    }

    const ads: AdCardProps[] = [...data.getAllAds]

    return (
        <>
            <h2>Annonces récentes</h2>
            <p>Prix total: {total} €</p>
            <section className="recent-ads">
                {ads.map((ad) => (
                    <div key={ad.title}>
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
