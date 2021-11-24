import { gql } from "apollo-server";

export default gql`
  type reserveRoomResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    reserveRoom(
      roomNumber: Int!
      _start: Int
      _finish: Int
      mem: [String]
    ): reserveRoomResult!
  }
`;
