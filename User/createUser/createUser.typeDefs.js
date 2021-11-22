import { gql } from "apollo-server";

export default gql`
  type createUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createUser(
      studentId: String!
      name: String!
      password: String!
      major: String!
      campus: Campus!
      idCard: Upload!
    ): createUserResult
  }
`;
