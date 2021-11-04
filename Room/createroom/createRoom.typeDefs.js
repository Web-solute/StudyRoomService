import { gql } from "apollo-server";

export default`
    type createRoomResult{
        ok:Boolean!
        error:String 
    }
    type Mutation{
        createRoom(
            roomNumber:Int!
            description:String
            roomPassword: String
        ): createRoomResult
    }
`