import {gql} from "apollo-server";

export default gql`
    type Query {
        disableRoom(roomId:Int):[Schedule]
    }
`;