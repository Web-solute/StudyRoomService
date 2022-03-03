import { gql } from "apollo-server";

export default gql`
  type falseQRResult {
    ok:Boolean!
    error:String
  }
  type Mutation {
    falseQR(qr:String!): falseQRResult!
  }
`;
