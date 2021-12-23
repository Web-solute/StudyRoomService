import { gql } from "apollo-server";

export default gql`
  type reserveRoomResult {
    ok: Boolean!
    id: Int
    error: String
  }

  type Mutation {
    reserveRoom(
      id:Int!
      start: String!
      finish: String!
    ): reserveRoomResult!
  }
`;
