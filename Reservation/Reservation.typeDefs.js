import { gql } from "apollo-server";

export default gql`
  type Reservation {
    id: Int!
    user: User!
    room: Room!
    schedule: Schedule!
    group: [User]
    createdAt: String!
    updatedAt: String!
  }

`;
