import { gql } from "apollo-server";

export default gql`
  type updatePasswordResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updatePassword(password:String!, newPassword:String!): updatePasswordResult!
  }
`;
