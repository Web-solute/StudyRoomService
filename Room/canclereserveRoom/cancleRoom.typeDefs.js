import { gql } from "apollo-server";

export default gql`
  type cancleRoomResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    cancleRoom(
      roomNumber: Int!
      _start: Int
      _finish: Int
    ): cancleRoomResult!
  }
`;
