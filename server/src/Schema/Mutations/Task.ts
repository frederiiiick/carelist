import { GraphQLID, GraphQLString } from "graphql";
import { Tasks } from "../Entities/Tasks";
import { ITask } from "../Interface";
import { MessageType } from "../TypeDefinitions/Message";

export const CREATE_TASK = {
    type: MessageType,
    args: {
        note: { type: GraphQLString },
        date: { type: GraphQLString },
        userId: { type: GraphQLID }
    },
    resolve(parent:any, args: ITask) {
        const { note, userId, date } = args;
        try {
            Tasks.insert({ note, userId, date })
            return { success: true, message: 'Task created.' }
        } catch (error) {
            return { success: false, message: 'Something went wrong.' }
        }
    }
}


export const UPDATE_TASK = {
    type: MessageType,
    args: { 
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        note: { type: GraphQLString }
    },
    async resolve(parent:any, args: ITask) {
        try {
            await Tasks.update({ id: args.id }, { note: args.note, date: args.date })
            return { success: true, message: 'Task updated.' }
        } catch (error) {
            return { success: false, message: 'Something went wrong.' }
        }
    }
}


export const DELETE_TASK = {
    type: MessageType,
    args: { id: { type: GraphQLID } },
    async resolve(parent:any, args: ITask) {
        const id = args.id;
        try {
            await Tasks.delete({id: id})
            return { success: true, message: 'Task deleted.' } 
        } catch (error) {
            return { success: false, message: 'Something went wrong.' }
        }
    }
}