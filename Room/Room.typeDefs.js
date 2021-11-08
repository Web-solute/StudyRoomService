import { gql } from "apollo-server";

export default gql`
  type Studyroom {
    id: Int!
    roomNumber: Int!
    description: String!
    schedule: Time!
    timeId: Int!
  }
  type Class {
    id: Int!
    name: Int!
    isReserved: Boolean!
    time: Time!
    timeId: Int!
  }
  type Time {
    is: Int!
    studyroom: Studyroom!
    classes: [Class]
  }
`;
