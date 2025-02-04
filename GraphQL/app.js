import {ApolloServer} from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import {typeDefs} from './schema.js'
import db from './_db.js'

const resolvers = {

    Query: {
        games() {
            return db.games;
        },

        reviews() {
            return db.reviews
        },

        authors() {
            return db.authors
        },

        review(_, args) {
             return db.reviews.find((rev) => (rev.id===args.id))
        },

        game(_,args) {
            return db.games.find((game) => (game.id === args.id))
        },

        author(_,args)
        {
            return db.authors.find((author) => (author.id === args.id))
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


const {url} = await startStandaloneServer(server, {
    listen: {port:7000}
})

console.log('Server ready at port: 7000');