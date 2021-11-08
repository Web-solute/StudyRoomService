import { gql } from "apollo-server";

export default gql`
  type createRoomResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createRoom(
      roomNumber: Int!
      description: String
      open: String
      closed: String
    ): createRoomResult!
  }
`;
