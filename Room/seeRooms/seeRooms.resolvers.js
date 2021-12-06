import { FilterRootFields } from "apollo-server-express";
import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeRooms: protectedResolver(async (_,__,{loggedInUser}) => {
      if(!loggedInUser.id){
        return null;
      }
      return await client.room.findMany({orderBy:{createdAt:'asc'}});
    }),
  },
};
