import { gql } from "apollo-server";

export default gql`
  type QRModel {
    id: Int!    
    qr: String!
    activate: Boolean!
    createdAt: String!      
    updatedAt: String!      
  }

`;
