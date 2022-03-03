import { gql } from "apollo-server";

export default gql`
  type updateQRResult {
    ok:Boolean!
    error:String
  }
  type Mutation {
    updateQR(id:Int! qr:String!): updateQRResult!
  }
`;
