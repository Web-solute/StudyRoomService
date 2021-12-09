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

`;
