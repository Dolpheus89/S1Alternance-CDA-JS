import Navigation from "./Navigation"
import Search from "./Search"

export default function Home() {
    return (
        <header className="header">
            <div className="main-menu">
                <h1>
                    <a href="/" className="button logo link-button">
                        <span className="mobile-short-label">TGC</span>
                        <span className="desktop-long-label">
                            THE GOOD CORNER
                        </span>
                    </a>
                </h1>
                <Search />
                <a href="/post-ad" className="button link-button">
                    <span className="mobile-short-label">Publier</span>
                    <span className="desktop-long-label">
                        Publier une annonce
                    </span>
                </a>
            </div>
            <Navigation />
        </header>
    )
}
