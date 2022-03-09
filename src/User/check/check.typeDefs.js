import { gql } from "apollo-server";

export default gql`
    type checkResult{
        ok:Boolean!
        error: String
    }
    type Mutation{
        managedUser(id:Int!): checkResult!
        verifiedUser(id:Int!): checkResult!
    }
`;