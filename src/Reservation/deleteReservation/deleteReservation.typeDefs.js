import {gql} from "apollo-server";

export default gql`
    type DeleteReservationResult {
        ok:Boolean!,
        error:String
    }
    type Mutation {
        deleteReservation(id:Int!):DeleteReservationResult!
    }
`;