import Navigation from "./Navigation"
import Search from "./Search"
import Link from "next/link"

export default function Header() {
    return (
        <header className="header">
            <div className="main-menu">
                <h1>
                    <Link href="/" className="button logo link-button">
                        <span className="mobile-short-label">TGC</span>
                        <span className="desktop-long-label">
                            THE GOOD CORNER
                        </span>
                    </Link>
                </h1>
                <Search />
                <Link href="/ad/new" className="button link-button">
                    <span className="mobile-short-label">Publier</span>
                    <span className="desktop-long-label">
                        Publier une annonce
                    </span>
                </Link>
            </div>
            <Navigation />
        </header>
    )
}
