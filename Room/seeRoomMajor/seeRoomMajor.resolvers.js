import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeRoomMajor: protectedResolver(async (_,__,{loggedInUser}) => {
      if(!loggedInUser.id){
        return null;
      }
      return await client.room.findMany({
          where:{major:loggedInUser.major},
          orderBy:{major:"asc"}
        });
    }),
  },
};
