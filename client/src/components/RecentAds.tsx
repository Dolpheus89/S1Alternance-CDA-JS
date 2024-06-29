import AdCard, { AdCardProps } from "./AdCard"
import { useState, useEffect } from "react"

const ads: AdCardProps[] = [
    {
        link: "/ads/table",
        imgSrc: "/images/table.webp",
        title: "Table",
        price: 120,
    },
    {
        link: "/ads/dame-jeanne",
        imgSrc: "/images/dame-jeanne.webp",
        title: "Dame-jeanne",
        price: 75,
    },
    {
        link: "/ads/vide-poche",
        imgSrc: "/images/vide-poche.webp",
        title: "Vide-poche",
        price: 4,
    },
    {
        link: "/ads/vaisselier",
        imgSrc: "/images/vaisselier.webp",
        title: "Vaisselier",
        price: 900,
    },
    {
        link: "/ads/bougie",
        imgSrc: "/images/bougie.webp",
        title: "Bougie",
        price: 8,
    },
    {
        link: "/ads/porte-magazine",
        imgSrc: "/images/porte-magazine.webp",
        title: "Porte-magazine",
        price: 45,
    },
]

export default function RecentAds() {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(0)
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
