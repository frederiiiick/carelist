import { GraphQLList, GraphQLString } from "graphql";
import { UserType } from "../TypeDefinitions/User";
import { Users } from "../Entities/Users";
import { IUser } from "../Interface";

export const GET_ALL_USER = {
    type: new GraphQLList(UserType),
    resolve() {
        return Users.find();
    }
}