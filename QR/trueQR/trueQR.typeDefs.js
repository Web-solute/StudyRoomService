import { gql } from "apollo-server";

export default gql`
  type trueQRResult {
    ok:Boolean!
    error:String
  }
  type Mutation {
    trueQR(qr:String!): trueQRResult!
  }
`;
