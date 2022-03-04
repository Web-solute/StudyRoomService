import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    studentId: String!
    major: Major!
    name: String!
    password: String!
    campus: Campus!
    idCard: String!
    email: String!
    isValid: Boolean!
    isManaged: Boolean!
    reservations: [Reservation]
    member: [Reservation]
    createdAt: String!
    updatedAt: String!
  }

  enum Campus {
    Seoul
    Global
  }

  enum Major {
    Computer
    Information_Communication
  }
`;
