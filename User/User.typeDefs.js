import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    name: String!
    studentId: Int!
    password: String!
    major: String!
    campus: Campus!
    isValid: Boolean!
    isManaged: Boolean!
    activateTime: String!
    terminatedTIme: String!
    createdAt: String!
    updatedAt: String!
  }

  enum Campus {
    Seoul
    Global
  }
`;
