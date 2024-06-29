const categories: string[] = [
    "Ameublement",
    "Électroménager",
    "Photographie",
    "Informatique",
    "Téléphonie",
    "Vélos",
    "Véhicules",
    "Sport",
    "Habillement",
    "Bébé",
    "Outillage",
    "Services",
    "Vacances",
]

export default function Navigation() {
    return (
        <nav className="categories-navigation">
            {categories.map((category) => (
                <a href="" className="category-navigation-link">
                    {category}
                </a>
            ))}
        </nav>
    )
}
