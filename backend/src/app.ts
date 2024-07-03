import "./utils/db"
import "dotenv/config"
import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { dsc, clearDB, initData } from "./utils/db"
import { buildSchema } from "type-graphql"
import { AdsQueries } from "./resolvers/AdsQueries"
import { TagsQueries } from "./resolvers/TagsQueries"
import { CategoriesQueries } from "./resolvers/CategoryQueries"

const PORT: number = Number(process.env.BACKEND_PORT) || 3310

async function startServerApollo() {
    const schema = await buildSchema({
        resolvers: [AdsQueries, TagsQueries, CategoriesQueries],
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    })

    await dsc.initialize()
    await clearDB()
    await initData()

    console.log(`🚀  Server ready at: ${url}`)
}

startServerApollo()
