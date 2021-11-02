import { gql } from "apollo-server";

export default gql`
    type deleteUserResult {
        ok: Boolean!
        error: String
    }

    type Mutation{
        deleteUser(
            studentId:String!
            password:String!
        ):deleteUserResult!
    }
`;