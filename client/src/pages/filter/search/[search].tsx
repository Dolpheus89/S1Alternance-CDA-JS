import AdCard, { AdCardProps } from "../../../components/AdCard"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import axios from "axios"

const SearchPage = () => {
    const router = useRouter()
    const [total, setTotal] = useState(0)
    const [ads, setAds] = useState<AdCardProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async (name: string) => {
            try {
                const result = await axios.get(
                    `http://localhost:3010/ads/byName/?name=${name}`
                )
                console.log(result.data)
                setAds(result.data)
                setIsLoading(false)
            } catch (err) {
                console.log("error", err)
                setAds([])
                setIsLoading(false)
            }
        }
        if (router.query.search) {
            fetchData(router.query.search as string)
        }
    }, [router.query.search])

    const addPrice = (price: number) => {
        setTotal(total! + price)
    }

    return (
        <>
            <h2>Resultat de la recherche "{router.query.search}"</h2>
            {ads.length < 1 ? (
                <p>No results, try again...</p>
            ) : (
                <p>Prix total: {total} €</p>
            )}
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

export default SearchPage
