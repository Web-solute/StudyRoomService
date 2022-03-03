import { gql } from "apollo-server";

export default gql`
  type createQRResult {
    ok:Boolean!
    error:String
  }
  type Mutation {
    createQR(qr:String!): createQRResult!
  }
`;
