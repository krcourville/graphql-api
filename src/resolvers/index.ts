import { Resolvers } from '../types';

import { MutationResolvers } from "../types";

import { DogBreedResolvers, FriendResolvers, QueryResolvers } from "../types";

// TODO: caching

export const Query: QueryResolvers = {
    friend: (_parent, args, ctx) => {
        return ctx.datasources.friends.getById(args.id);
    },
    friends: (_parent, _args, ctx) => {
        return ctx.datasources.friends.getAll();
    },
    dogBreeds: (_parent, _args, ctx) => {
        return ctx.datasources.dogBreeds.getAll();
    },

}

export const Friend: FriendResolvers = {
    dogBreed: (parent, _args, ctx) => {
        return ctx.datasources.dogBreeds.getById(parent.dogBreedId);
    }
}


export const DogBreed: DogBreedResolvers = {

};


const Mutation: MutationResolvers = {
    addFriend: (_, { item }, ctx) => {
        return ctx.datasources.friends.add(item);

    },
    addDog: (_, { item }, ctx) => {
        return ctx.datasources.dogBreeds.add(item);
    }
};

export const resolvers: Resolvers = { Query, Mutation, DogBreed, Friend };
