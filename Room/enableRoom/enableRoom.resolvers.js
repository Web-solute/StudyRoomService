import { FilterRootFields } from "apollo-server-express";
import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    enableRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { select } = args;
      const classes = await client.class.findMany({
        where: {
          name: select,
          isReserved: false,
        },
        select: {
          room: true,
        },
      });

      //const rooms=classes.map(class=>await client.room.findFirst({where:{roomId:class.roomId}}));
      //console.log(rooms);
      if (classes) {
        //console.log(classes.room);
        return classes;
      } else {
        return {
          error: "선택 가능한 방이 없습니다. ",
        };
      }
    }),
  },
};
