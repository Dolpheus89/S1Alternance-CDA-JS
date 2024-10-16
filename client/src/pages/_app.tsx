import Layout from "@/components/Layout"
import "@/styles/globals.css"
import "@/styles/Header.css"
import "@/styles/NewAD.css"
import "@/styles/AdDetailComponent.css"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client"

const client = new ApolloClient({
    uri: "http://localhost:3010/",
    cache: new InMemoryCache(),
})

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ApolloProvider>
    )
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false })
