import { gql } from "apollo-server";

export default gql`
  type updateUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateUser(name: String, password: String, major: String): updateUserResult!
  }
`;
