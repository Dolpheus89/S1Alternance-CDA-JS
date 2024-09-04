import "./utils/db"
import "dotenv/config"
import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"
import { dsc } from "./utils/db"
import { buildSchema } from "type-graphql"
import { AdsResolvers } from "./resolvers/AdsResolvers"
import { TagsResolvers } from "./resolvers/TagsResolvers"
import { CategoriesResolvers } from "./resolvers/CategoryResolvers"
import { UserResolvers } from "./resolvers/UsersResolvers"
import jwt from "jsonwebtoken"

const PORT: number = Number(process.env.BACKEND_PORT) || 3310

async function startServerApollo() {
    const schema = await buildSchema({
        resolvers: [AdsResolvers, TagsResolvers, CategoriesResolvers, UserResolvers],
        authChecker: ({context}, roles: string[]) => {
            if (context.user && roles.includes(context.user.role)) {
                return true
            }
            return false
        }
    })

    const server = new ApolloServer({
        schema,
    })
    
    await dsc.initialize()

    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
        context: async({req}) => {
            const authHeader: string | undefined = req.headers.authorization
            let user = null
            if (authHeader?.startsWith('Bearer ') === true){
                const tokenValue : string = authHeader.substring('Bearer '.length)
                
                const jwtSecret: string | undefined = process.env.JWT_SECRET

                if(!jwtSecret) {
                    throw new Error('invalid JWT secret')
                }

                user = jwt.verify(tokenValue, jwtSecret)
            }

            return { user }
        }
    })

    console.log(`🚀  Server ready at: ${url}`)
}

startServerApollo()
