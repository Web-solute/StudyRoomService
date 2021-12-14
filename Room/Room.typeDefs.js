import { gql } from "apollo-server";

export default gql`
  type Room {
    id: Int!
    major: Major!
    roomNumber: Int!
    description: String!
    open: String
    closed: String
    reservation: [Reservation]
    schedules: [Schedule]
    createdAt: String!
    updatedAt: String!
  }

`;
