import AdCard, { AdCardProps } from "./AdCard"
import { useState, useEffect } from "react"
import axios from "axios"

export default function RecentAds() {
    const [total, setTotal] = useState(0)
    const [ads, setAds] = useState<AdCardProps[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get("http://localhost:3010/ads/")

                setAds(result.data)
            } catch (err) {
                console.log("error", err)
            }
        }
        fetchData()
    }, [])

    const addPrice = (price: number) => {
        setTotal(total! + price)
    }

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
