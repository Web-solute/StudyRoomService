import { gql } from "apollo-server";

export default gql`
  type reserveRoomResult {
    ok: Boolean!
    id: Int
    error: String
  }

  type Mutation {
    reserveRoom(
      major: Major!
      roomNumber: Int!
      start: String!
      finish: String!
    ): reserveRoomResult!
  }
`;
