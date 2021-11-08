import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    studentId: String!
    major: String!
    name: String!
    password: String!
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
