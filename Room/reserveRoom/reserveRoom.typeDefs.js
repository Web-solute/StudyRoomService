import { gql } from "apollo-server";

export default gql`
  type reserveRoomResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    reserveRoom(roomNumber: Int!, start: Int, end: Int): reserveRoomResult!
  }
`;
