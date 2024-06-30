import { useRouter } from "next/router"
import AdCard, { AdCardProps } from "../../../components/AdCard"
import { useState, useEffect } from "react"
import axios from "axios"

const FilteredByCategory = () => {
    const [total, setTotal] = useState(0)
    const [ads, setAds] = useState<AdCardProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const fetchData = async (category: string) => {
            try {
                const result = await axios.get(
                    `http://localhost:3010/ads/categories/?cat1=${category}`
                )
                console.log(result.data)
                setAds(result.data)
                setIsLoading(false)
            } catch (err) {
                console.log("error", err)
                setAds([
                    {
                        id: "0",
                        picture: "/shield-question.svg",
                        title: "Recherche non trouvé",
                        price: 0,
                    },
                ])
                setIsLoading(false)
            }
        }
        if (router.query.category) {
            fetchData(router.query.category as string)
        }
    }, [router.query.category])

    const addPrice = (price: number) => {
        setTotal(total! + price)
    }
    return (
        <>
            <h2>{router.query.category} :</h2>
            <p>Prix total: {total} €</p>
            {isLoading ? (
                <p>loading ...</p>
            ) : (
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
            )}
        </>
    )
}

export default FilteredByCategory
