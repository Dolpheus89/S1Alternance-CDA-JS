import AdCard from "./AdCard"
import { useState } from "react"
import { useGetAllAdsQuery } from "@/__generated__/graphql"
import { AdCardProps } from "./AdCard"

export default function RecentAds() {
    const [total, setTotal] = useState(0)
    const { data, loading, error } = useGetAllAdsQuery()

    const addPrice = (price: number) => {
        setTotal(total! + price)
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error || !data) {
        return <p>Error : {error ? error.message : "No Data available"}</p>
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
