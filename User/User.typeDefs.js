import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    studentId: String!
    major: Major!
    name: String!
    password: String!
    campus: Campus!
    idCard: String!
    email: String!
>>>>>>> 4871592faad1b3c70d05a47c711d77f3d0cfa774
    isValid: Boolean!
    isManaged: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  enum Campus {
    Seoul
    Global
  }

  enum Major {
    Computer
    Information_Communication
  }
`;
