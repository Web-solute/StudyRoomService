import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query: {
        seeRooms: protectedResolver(
            async () => client.studyroom.findMany()
        )
    },
};