import { gql } from "apollo-server";

export default gql`
  type Query {
    myReservationToday: [Reservation]
  }
`;
