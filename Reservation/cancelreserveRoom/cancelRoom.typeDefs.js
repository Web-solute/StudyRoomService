import { gql } from "apollo-server";

export default gql`
  type cancelRoomResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    cancelRoom(
      roomNumber: Int!
      _start: Int
      _finish: Int
    ): cancleRoomResult!
  }
`;
