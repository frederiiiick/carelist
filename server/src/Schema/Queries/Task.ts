import { GraphQLID, GraphQLList } from "graphql";
import { TaskType } from "../TypeDefinitions/Task";
import { Tasks } from "../Entities/Tasks";
import { ITask } from "../Interface";

export const GET_TASK_BY_USER_ID = {
    type: new GraphQLList(TaskType),
    args: { userId: { type: GraphQLID } },
    resolve(parent: any, args: ITask) {
        return Tasks.find({
                where: { userId: args.userId,},
                order: { id: 'DESC', }
            }
        );
    }
}