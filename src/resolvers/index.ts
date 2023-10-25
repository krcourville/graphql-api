import { FollowConnectionResolvers, PersonNodeResolvers, Resolvers } from '../types';

import { MutationResolvers } from "../types";

import { QueryResolvers } from "../types";

// TODO: caching

export const Query: QueryResolvers = {
    person: (_parent, args, ctx) => {
        return {
            id: args.id
        };
        // return ctx.datasources.person.getById(args.id);
    },

}


const Mutation: MutationResolvers = {
    // addPerson: (_, { item }, ctx) => {
    //     return ctx.datasources.person.add(item);

    // },
    // addDog: (_, { item }, ctx) => {
    //     return ctx.datasources.dogBreed.add(item);
    // },

    follow: (_, { input }, ctx) => {
        return ctx.datasources.person.upsertFollowEdge(input);
    }
};

const PersonNode: PersonNodeResolvers = {
    follows: (parent, args, ctx) => {
        const personId = parent.id;
        return ctx.datasources.person.getFollowedVetsForPerson(personId);
    }
}

export const resolvers: Resolvers = { Query, Mutation, PersonNode };
