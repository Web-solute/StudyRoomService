import { gql } from "apollo-server";

export default gql`
  type allFalseQRResult {
    ok:Boolean!
    error:String
  }
  type Mutation {
    allFalseQR: allFalseQRResult!
  }
`;
