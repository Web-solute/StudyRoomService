import { gql } from "apollo-server";

export default gql`
    type createUserResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        createUser(
            name:String!
            studentId:String!
            major:String!
            password:String!
        ):createUserResult
    }  
`;