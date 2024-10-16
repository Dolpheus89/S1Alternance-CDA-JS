import Header from "../components/Header"
import Head from "next/head"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {" "}
            <Head>
                <title>The Good Corner</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Header />
            <main className="main-content">{children}</main>
        </>
    )
}

export default Layout
