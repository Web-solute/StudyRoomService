import { gql } from "apollo-server";

export default gql`
  type removeUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    removeUser(studentId:String!):removeUserResult
  }
`;
