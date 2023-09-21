import { AsyncLocalStorage } from "node:async_hooks";
import { RequestHandler } from "express";
import { IncomingHttpHeaders } from "http";
import { singleton } from '$app';
import { GraphQLError } from "graphql";


export type UserContext = {
    username?: string;
    clientId?: string;
}

type RequestContext = {
    headers: IncomingHttpHeaders;
}

const storage = new AsyncLocalStorage<RequestContext>();

/**
 * Express middleware/http handler that stores headers in
 * an AsyncLocalStorage instance so that headers are indirectly
 * made available to UserContextProvider.get() (see below)
 */
export function userContextMiddleware() {
    const handler: RequestHandler = async (req, _res, next) => {
        const requestContext = {
            headers: req.headers,
        };
        storage.run(requestContext, () => next());

    };
    return handler;
}

let instanceCount = 0;
/**
 * Resolves current UserContext based on request headers.
 */
@singleton()
export class UserContextProvider {
    constructor() {
        console.log(`UserContextProvider instance ${++instanceCount} created`);
    }
    /**
     * Resolve current user context.
     *
     * A promise is used to allow for additional
     * async processing.
     */
    async get(): Promise<UserContext> {
        const requestContext = storage.getStore();
        if (requestContext == null) {
            throw new Error(
                'Request context cannot be resolved.\n' +
                'Is userContextMiddleware registered in your app?'
            );
        }

        const { headers } = requestContext;
        const username = getHeaderValueOrThrow(headers, 'x-username');
        const clientId = getHeaderValueOrThrow(headers, 'x-client-id');

        return {
            username,
            clientId,
        }
    }
}

function getHeaderValueOrThrow(headers: IncomingHttpHeaders, key: string): string | undefined {
    const headerValue = headers[key.toLowerCase()];
    if (headerValue == null || headerValue.length === 0) {
        throw new GraphQLError(`Required header was not provided or is empty: ${key}`, {
            extensions: {
                code: 'REQUIRED_HEADER_NOT_PROVIDED',
                http: { status: 400 }
            }
        })
    }
    return headerValue as string;
}
