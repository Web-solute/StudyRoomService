import { gql } from "apollo-server";

export default gql`
  type changePasswordResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    changePassword(email:String!):changePasswordResult
  }
`;
