import { useRouter } from "next/router"
import { useState } from "react"
import { useQuery } from "@apollo/client"
import { GET_ADS_BY_ID_QUERY } from "@/graphql-queries/ads"

export type AdDetailsProps = {
    description: string | null
    location: string | null
    owner: string
    price: number
    title: string
    picture: string
    createdAt: string
}

const AdDetailComponent = () => {
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const { data, loading, error } = useQuery(GET_ADS_BY_ID_QUERY, {
        variables: { id: Number(router.query.id) },
    })

    // const deleteAd = async () => {
    //     try {
    //         await axios.delete(`http://localhost:3010/ads/${router.query.id}`)
    //         router.push("/")
    //     } catch (error) {
    //         console.error("Error deleting the ad:", error)
    //     }
    // }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error : {error.message}</p>
    }

    const ad: AdDetailsProps = data.getAdById[0]

    return (
        <>
            <div id="adDetails">
                <img src={ad.picture} alt={ad.title} />
                <div className="content">
                    <h1>{ad.title}</h1>
                    <p>
                        <strong>Owner:</strong> {ad.owner}
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(ad.createdAt).toLocaleString()}
                    </p>
                    <p>
                        <strong>Description:</strong>{" "}
                        {ad.description || "No description available"}
                    </p>
                    <p>
                        <strong>Location:</strong>{" "}
                        {ad.location || "No location available"}
                    </p>
                    <p>
                        <strong>Price:</strong> ${ad.price || 0}
                    </p>
                    <button className="button">Buy Now</button>
                </div>
                <button className="trash" onClick={() => setModal(!modal)}>
                    <img src="/trash-2.svg" alt="delete" />
                </button>
            </div>
            {modal && (
                <div className="overlay" onClick={() => setModal(!modal)}>
                    <div id="deleteContainer">
                        <p>Voulez-vous vraiment supprimé cette annonce ?</p>
                        <div className="choice">
                            <button className="button">Oui!</button>
                            <button
                                className="button"
                                onClick={() => setModal(!modal)}
                            >
                                Non
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdDetailComponent
