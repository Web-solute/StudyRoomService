import { gql } from "apollo-server";

export default gql`
    type createTimeResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        createTime(
            description:String
        ): createTimeResult
    }
`
