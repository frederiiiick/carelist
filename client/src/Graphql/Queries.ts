import { gql } from "@apollo/client";

export const GET_USER_TASKS = gql`
    query getTaskByUser($userId: ID!) {
        getTaskByUser(userId: $userId) {
            note
            date
            id
        }
    }
`