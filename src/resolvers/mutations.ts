import { MutationResolvers } from "../types";

const mutations: MutationResolvers = {
    addFriend: async (_, { item }, ctx) => {
        const res = await ctx.friendsDs.addFriend(item);
        return res;
    }
};

export default mutations;
