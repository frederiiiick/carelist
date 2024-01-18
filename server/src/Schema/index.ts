import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USER } from "./Queries/User"; 
import { CREATE_USER, DELETE_USER, UPDATE_USER_INFO, UPDATE_USER_PASSWORD, USER_LOGIN } from "./Mutations/User";
import { GET_TASK_BY_USER_ID } from "./Queries/Task";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "./Mutations/Task";

const MainQuery = new GraphQLObjectType({
    name: 'MainQuery',
    fields: {
        getAllusers: GET_ALL_USER,
        getTaskByUser: GET_TASK_BY_USER_ID,
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: CREATE_USER,
        userLogin: USER_LOGIN,
        deleteUser: DELETE_USER,
        updateUserInfo: UPDATE_USER_INFO,
        updateUserPassword: UPDATE_USER_PASSWORD,
        createTask: CREATE_TASK,
        updateTask: UPDATE_TASK,
        deleteTask: DELETE_TASK,
    }
})

export const schema = new GraphQLSchema({
    query: MainQuery,
    mutation: Mutation,
})