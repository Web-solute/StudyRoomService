import { gql } from "apollo-server";

export default gql`
  type Schedule {
    id: Int!
    year: String!
    month: String!
    date: String!
    start: String!
    finish: String!
    isReserved: Boolean!
    room: [Room]
    reservation: Reservation
    createdAt: String!
    updatedAt: String!
  }

`;
