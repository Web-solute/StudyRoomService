import { gql } from "apollo-server";

export default gql`
  type updateRoomResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateRoom(roomNumber:Int, description:String,open: String, closed: String): updateRoomResult!
  }
`;
