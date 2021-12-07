import { gql } from "apollo-server";

export default gql`
  type Query {
    seeReservations_room(roomId: Int!): [Reservation]
  }
`;
