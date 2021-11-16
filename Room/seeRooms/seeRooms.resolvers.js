import { FilterRootFields } from "apollo-server-express";
import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeRooms: protectedResolver(async (_) => {
      return await client.studyroom.findMany();
    }),
  },
};
