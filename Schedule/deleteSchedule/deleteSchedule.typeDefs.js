import {gql} from "apollo-server";

export default gql`
    type DeleteScheduleResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        deleteSchedule(scheduleId:Int!):DeleteScheduleResult!
    }
`;