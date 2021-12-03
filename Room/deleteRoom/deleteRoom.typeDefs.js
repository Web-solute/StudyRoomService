import { gql } from "apollo-server";

export default gql`
    type DeleteRoomResult{
        ok:Boolean!
        error:String
    }
    type Mutation {
        deleteRoom(id:Int!):DeleteRoomResult!
    }
`;