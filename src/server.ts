import dotenv from 'dotenv';
dotenv.config();

import { readFile } from 'node:fs/promises';
import { ApolloServer } from '@apollo/server';
import { ExpressContextFunctionArgument, expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
    ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default';
import pkg from 'body-parser';
import cors from 'cors';

import { ApiContext } from './context';
import { resolvers } from './resolvers';
import { resolve } from './app/injection';
import { userContextMiddleware } from './context/user-context';

(function () {
    serve();
})();

async function serve() {
    const app = express();
    const httpServer = http.createServer(app);
    const typeDefs = await readFile('./schema/schema.graphql', { encoding: 'utf-8' });
    const server = new ApolloServer<ApiContext>({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ footer: false })
        ]
    });

    await server.start();
    const { json } = pkg;
    app.use(
        '/graphql',
        cors(),
        json(),
        userContextMiddleware(),
        expressMiddleware(server, {
            context: apiContext,
        })
    )
    app.on('error', (err) => {
        console.log(err);
    });
    const port = Number(process.env.PORT || 3000);
    httpServer.listen({ port })
    console.log(`🚀 Server listening at: http://localhost:${port}/graphql`);
}
const context = resolve(ApiContext);
async function apiContext(args: ExpressContextFunctionArgument): Promise<ApiContext> {
    return context;
}
