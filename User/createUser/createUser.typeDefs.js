import { gql } from "apollo-server";

export default gql`

    type createUserResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        createUser(
            studentId:Int!
            name:String!
            password:String!
            major:String!
            campus: Campus!
        ):createUserResult
    }  
`;
