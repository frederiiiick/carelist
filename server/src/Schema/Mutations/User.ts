import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefinitions/User";
import { MessageType } from "../TypeDefinitions/Message";
import { Users } from "../Entities/Users";
import { IUser, IUserUpdatePassword } from "../Interface";

export const CREATE_USER = {
    type: MessageType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve(parent: any, args: IUser) {
        const { name, username, password } = args;
        try {
            Users.insert({ name: name, username: username, password: password })
            return { success: true, message: 'User created.' }
        } catch (error) {
            return { success: false, message: 'Something went wrong.' }
        }
    }
}


export const USER_LOGIN = {
    type: UserType,
    args: { 
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent: any, args: IUser) {
        const { username, password  } = args
        const user =  await Users.findOneBy({ username: username })
        const userPassword = user?.password;
        if (password === userPassword) {
            return user
        } else {
            throw new Error("Invalid Credentials");
        }
    }
}

export const UPDATE_USER_INFO = {
    type: MessageType,
    args: { id: { type: GraphQLID } },
    async resolve(parent: any, args: IUser) {
        const { id, name, username  } = args
        try {
            await Users.update({ id:id }, { name: name, username: username })
            return { success: true, message: 'User info updated.' }
        } catch (error) {
            return { success: false, message: 'Something went wrong.' }
        }
    }
}


export const UPDATE_USER_PASSWORD = {
    type: MessageType,
    args: { 
        id: { type: GraphQLID },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString }
    },
    async resolve(parent: any, args: IUserUpdatePassword) {
        const { id, oldPassword, newPassword  } = args
        const user =  await Users.findOneBy({ id: id })
        const userPassword = user?.password;
        try {
            if (oldPassword === userPassword) {
                await Users.update({ id:id }, { password: newPassword })
                return { success: true, message: 'User password updated.' }
            } else {
                return { success: false, message: 'Something went wrong.' }
            }
        } catch (error) {
            return { success: false, message: 'Something went wrong.' }
        }
    }
}


export const DELETE_USER = {
    type: MessageType,
    args: { id: { type: GraphQLID } },
    async resolve(parent: any, args: IUser) {
        try {
            const id = args.id;
            await Users.delete({id: id})
            return { success: true, message: 'User deleted.' }
        } catch (error) {
            return { success: false, message: 'Something went wrong.' }
        }
    }
}