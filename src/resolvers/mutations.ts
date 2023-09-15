import { MutationResolvers } from "../types";

const mutations: MutationResolvers = {
    addFriend: async (_, { item }, { datasources: ds }) => {
        const dog = await ds.dogBreeds.getById(item.dogBreedId);
        const res = await ds.friends.add(item);
        return {
            dog,
            ...res
        };
    },
    addDog: async (_, { item }, { datasources: ds }) => {
        const res = await ds.dogBreeds.add(item);
        return res;
    }
};

export default mutations;
