import { QueryResolvers } from "../types";

const queries: QueryResolvers = {
    friends: async (_, { id }, { datasources: ds }) => {
        const items = await ds.friends.getById(id);
        return items.map(item => {
            return {
                ...item,
                // TODO: how to handle nested resolver??
                dog: {
                    id: 'TODO',
                    name: 'TODO',
                    knownFor: 'TODO',
                }
            }
        })
    }
}

export default queries;
