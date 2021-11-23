import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    studentId: String!
    major: String!
    name: String!
    password: String!
    campus: Campus!
    idCard: String!
    email: String!
    isValid: Boolean!
    isManaged: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  enum Campus {
    Seoul
    Global
  }
`;
