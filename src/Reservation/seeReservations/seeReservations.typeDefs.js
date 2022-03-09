import { gql } from "apollo-server";

export default gql`
  type Query {
    seeReservations(roomId:Int): [Reservation]
  }
`;
