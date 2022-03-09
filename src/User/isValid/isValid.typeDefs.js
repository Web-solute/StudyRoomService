import { gql } from "apollo-server";

export default gql`
    type IsValidResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        isValid(id:Int!):IsValidResult!
    }
`;