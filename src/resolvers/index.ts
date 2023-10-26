import { PersonNodeResolvers, Resolvers, VetNodeResolvers } from '../types';

import { MutationResolvers } from "../types";

import { QueryResolvers } from "../types";

// TODO: caching

export const Query: QueryResolvers = {
    person: (_parent, args, _ctx) => {
        return {
            id: args.id
        };
    },
    vet: (_parent, args, _ctx) => {
        return {
            id: args.id
        }
    }

}


const Mutation: MutationResolvers = {
    follow: (_, { input }, ctx) => {
        return ctx.datasources.friend.upsertFollowEdge(input);
    }
};

const PersonNode: PersonNodeResolvers = {
    follows: (parent, { input }, ctx) => {
        const personId = parent.id;
        return ctx.datasources.friend.getFollowedVetsForPerson(personId, input);
    }
}

const VetNode: VetNodeResolvers = {
    followers: (parent, args, ctx) => {
        const vetId = parent.id;
        return ctx.datasources.friend.getFollowersForVet(vetId);
    }
}

export const resolvers: Resolvers = { Query, Mutation, PersonNode, VetNode };
