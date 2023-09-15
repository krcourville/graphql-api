import { QueryResolvers } from "../types";

const queries: QueryResolvers = {
    friends: async (_, __, ctx) => {
        const items = await ctx.friendsDs.getFriends();
        return items;
    }
}

export default queries;
