import { DogBreedResolvers, FriendResolvers, QueryResolvers } from "../types";

export const Query: QueryResolvers = {
    // TODO: can we avoid `any` here?
    friend: (_parent, args, _ctx) => {
        return ({ id: args.id } as any);
    },
    dogBreeds: async (_parent, _args, ctx) => {
        const { datasources: ds } = ctx;
        const items = await ds.dogBreeds.getAll();
        return items;
    }

}

export const Friend: FriendResolvers = {
    id: async (parent, _args, _ctx) => {
        return parent.id;
    },
    name: async (parent, _args, ctx) => {
        const { datasources: ds } = ctx;
        const { name } = await ds.friends.getById(parent.id);
        return name;
    },
    dogBreed: async (parent, _args, ctx) => {
        const { datasources: ds } = ctx;
        const { dogBreedId } = await ds.friends.getById(parent.id);
        return {
            id: dogBreedId
        } as any;
    }
}


export const DogBreed: DogBreedResolvers = {
    id: async (parent, _args, _ctx) => {
        return parent.id;
    },
    knownFor: async (parent, _, ctx) => {
        const { datasources: ds } = ctx;
        const { knownFor } = await ds.dogBreeds.getById(parent.id);
        return knownFor;
    },
    name: async (parent, _, ctx) => {
        const { datasources: ds } = ctx;
        const { name } = await ds.dogBreeds.getById(parent.id);
        return name;
    },
    createdBy: async (parent, _, ctx) => {
        const { datasources: ds } = ctx;
        const { createdBy } = await ds.dogBreeds.getById(parent.id);
        return createdBy ?? 'unknown';
    },

};
