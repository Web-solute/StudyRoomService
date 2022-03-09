import { gql } from "apollo-server";

export default gql`
  type updateRoomResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateRoom(
      id:Int!
      roomNumber: Int
      description: String
      major: Major
      open: String
      closed: String
    ): updateRoomResult!
  }
`;
