import { gql } from "apollo-server";

export default gql`
  type changeRoomResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    changeRoom(
      roomNumber: Int!
      changeRoomNumber: Int!
      _start: Int!
      _finish: Int
      _changestart: Int!
      _changefinish: Int
      mem: [String]
    ):changeRoomResult!
  }
`;