import { gql } from "apollo-server";

export default gql`
  type Room {
    id: Int!
    roomNumber: Int!
    roomPassword: String!
    major: Major!
    description: String!
    classes: Class!
  }
  type Class {
    id: Int!
    name: Int!
    isReserved: Boolean!
    room: Room!
    roomId: Int!
  }
  type Reservation {
    id: Int!
    userId: Int!
    date: String
    start: Int
    finish: Int
    space: Int
    user: User!
    group: User!
  }
  type User {
    id: Int!
    studentId: String!
    major: Major!
    name: String!
    password: String!

    idCard: String
    isValid: Boolean!
    isManaged: Boolean!
    createdAt: String!
    updatedAt: String!
    reservations: Reservation!
    member: Reservation!
  }

  enum Major {
    Computer
    Information_Communication
  }
`;
