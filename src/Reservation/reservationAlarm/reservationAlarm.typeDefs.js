import {gql} from "apollo-server";

export default gql`
    type Subscription{
        reservationAlarm(id:Int!):Reservation
    }
`;