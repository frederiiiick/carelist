import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLID },
        note: { type: GraphQLString },
        date: { type: GraphQLString },
    })
})