import { useRouter } from "next/router"
import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { DELETE_AD_MUTATION, GET_ADS_BY_ID_QUERY } from "@/graphql-queries/ads"

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
    const {
        data: getAdData,
        loading: getAdLoading,
        error: getAdError,
    } = useQuery(GET_ADS_BY_ID_QUERY, {
        variables: { id: Number(router.query.id) },
    })

    const [deleteAdByID, { data, loading, error }] =
        useMutation(DELETE_AD_MUTATION)

    const deleteAd = async () => {
        try {
            const { data } = await deleteAdByID({
                variables: {
                    deleteAdId: Number(router.query.id),
                },
            })
            console.log(data)
            router.push("/")
        } catch (error) {
            console.error("Error deleting the ad:", error)
        }
    }

    if (getAdLoading) {
        return <p>Loading...</p>
    }

    if (getAdError) {
        return <p>Error : {getAdError.message}</p>
    }

    const ad: AdDetailsProps = getAdData.getAdById
    console.log("mutation data", loading, data, error)

    return (
        <>
            <div id="adDetails">
                <img
                    src={ad.picture || "/shield-question.svg"}
                    alt={ad.title}
                />
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
                            <button className="button" onClick={deleteAd}>
                                Oui!
                            </button>
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
