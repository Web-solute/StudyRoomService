import {gql} from "apollo-server";

export default gql`
    type CreateScheduleResult {
        ok:Boolean!
        error:String
    }
    type Mutation {
        createSchedule:CreateScheduleResult
    }
`;
