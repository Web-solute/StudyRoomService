import { FilterRootFields } from "apollo-server-express";
import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      if (!loggedInUser.id) {
        return null;
      }
      const { id } = args;
      return await client.room.findUnique({
        where: {
          id,
        },
      });
    }),
  },
};
