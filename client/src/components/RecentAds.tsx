import AdCard, { AdCardProps } from "./AdCard"

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
    return (
        <main className="main-content">
            <h2>Annonces récentes</h2>
            <section className="recent-ads">
                {ads.map((ad) => (
                    <AdCard
                        link={ad.link}
                        imgSrc={ad.imgSrc}
                        title={ad.title}
                        price={ad.price}
                        key={ad.title}
                    />
                ))}
            </section>
        </main>
    )
}
