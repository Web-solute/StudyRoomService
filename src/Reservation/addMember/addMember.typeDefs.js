import {gql} from "apollo-server";

export default gql`
    type AddMemberResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        addMember(reservationId: Int!, group: [String]): AddMemberResult!
    }
`;