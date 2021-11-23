import { gql } from "apollo-server";

export default gql`
  type createUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createUser(
      studentId: String!
      major: String!
      name: String!
      password: String!
      campus: Campus!
      idCard: Upload
      email: String!
    ): createUserResult
  }
`;
