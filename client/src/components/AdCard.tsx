import { Ads } from "@/__generated__/graphql"

const AdCard = ({ id, picture, title, price }: Ads) => {
    return (
        <div className="ad-card-container">
            <a className="ad-card-link" href={`/ad/${id}`}>
                <img
                    className="ad-card-image"
                    src={picture || "/shield-question.svg"}
                />
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">{price} €</div>
                </div>
            </a>
        </div>
    )
}

export default AdCard
