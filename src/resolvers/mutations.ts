import { MutationResolvers } from "../types";

const mutations: MutationResolvers = {
    addFriend: async (_, { item }, { datasources: ds }) => {
        await ds.dogBreeds.getById(item.dogBreedId);
        const res = await ds.friends.add(item);
        // TODO: avoid any?
        return {
            id: res.id
        } as any;
        // return {
        //     dog,
        //     ...res
        // };
    },
    addDog: async (_, { item }, { datasources: ds }) => {
        const res = await ds.dogBreeds.add(item);
        return res;
    }
};

export default mutations;
