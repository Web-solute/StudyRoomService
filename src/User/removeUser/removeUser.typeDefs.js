import { gql } from "apollo-server";

export default gql`
  type removeUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    removeUser(id:Int!):removeUserResult
  }
`;
