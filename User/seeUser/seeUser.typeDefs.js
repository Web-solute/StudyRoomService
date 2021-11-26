import { gql } from "apollo-server";

export default gql`
    type Query {
        seeUser(studentId:String!): User
    }
`;