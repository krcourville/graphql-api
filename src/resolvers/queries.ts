import { QueryResolvers } from "../types";

const queries: QueryResolvers = {
    friends: async (_, { id }, ctx) => {
        const items = await ctx.friendsDs.getFriend(id);
        return items;
    }
}

export default queries;
