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
        },

    },
    
    Game: {
        reviews(parent){
            // parent is refrence to value returned by previous/parent resolver
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },

    Author: {
        reviews(parent)
        {
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },

    Review: {
        author(parent) 
        {
            return db.authors.find((author) => (author.id === parent.author_id))
        },

        game(parent) 
        {
            return db.games.find((game) => (game.id == parent.game_id))
        }
    },


    Mutation: {


       
        deleteGame( _, args)
        {
            db.games = db.games.filter((game) => (game.id !== args.id));
            return db.games;
        },

        addGame(_,args)
        {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }

            db.games.push(game);
            return game;
        }
    }
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})


const {url} = await startStandaloneServer(server, {
    listen: {port:7001}
})

console.log('Server ready at port: 7001');


