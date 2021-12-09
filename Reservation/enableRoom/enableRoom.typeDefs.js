import { gql } from "apollo-server-express";

export default gql`
  type Query {
    enableRoom(select: Int!): [Class]
  }
`;
