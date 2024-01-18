import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation createUser(
        $name: String!
        $username: String!
        $password: String!
        ) {
        createUser(
            name: $name
            username: $username
            password: $password
        ) {
            success
            message
        }
    }
`

export const USER_LOGIN = gql`
    mutation userLogin(
        $username: String!
        $password: String!
        ) {
        userLogin(
            username: $username
            password: $password
        ) {
            id
            name
            username
            password
        }
    }
`

export const CREATE_TASK = gql`
    mutation createTask(
        $userId: ID!
        $note: String!
        $date: String!
        ) {
        createTask(
            userId: $userId
            note: $note
            date: $date
        ) {
            success
            message
        }
    }
`

export const DELETE_TASK = gql`
    mutation deleteTask($id: ID!) {
        deleteTask(id: $id) {
            success
            message
        }
    }
`