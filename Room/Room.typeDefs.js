import { gql } from "apollo-server";

export default gql`
  type Room {
    id: Int!
    roomNumber: Int!
    roomPassword: String!
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
  }
`;
