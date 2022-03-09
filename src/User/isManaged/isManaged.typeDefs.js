import { gql } from "apollo-server";

export default gql`
    type IsManagedResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        isManaged(id:Int!):IsManagedResult!
    }
`;