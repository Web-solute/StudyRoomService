import { gql } from "apollo-server";

export default gql`
  type createUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createUser(
      studentId: String!
      major: Major!
      name: String!
      password: String!
      campus: Campus!
      idCard: Upload!
      email: String!
>>>>>>> 4871592faad1b3c70d05a47c711d77f3d0cfa774
    ): createUserResult
  }
`;
