import { gql } from "apollo-server";

export default gql`
  type Reservation {
    id: Int!
    user: User!
    date: String!
    start: Int!
    finish: Int!
    room: Room
    group: [User]
    createdAt: String!
    updatedAt: String!
  }

  type Room {
    id: Int!
    roomNumber: Int!
    roomPassword: String
    major: Major!
    description: String!
    open: String
    closed: String
    reservation: [Reservation]
    classes: [Class]
    createdAt: String!
    updatedAt: String!
  }

  type Class {
    id: Int!
    name: Int!
    isReserved: Boolean!
    room: Room
    createdAt: String!
    updatedAt: String!
  }

`;
