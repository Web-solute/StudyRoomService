import { FilterRootFields } from "apollo-server-express";
import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, args) => {
      const { select } = args;
      const lists = await client.class.findMany({
        where: {
          name: select,
          isReserved: false,
        },
        select: {
          timeId: true,
        },
      });
      const rooms = [];

      if (lists) {
        lists.map((list) => {
          const room = client.studyroom.findFirst({
            where: {
              timeId: list.timeId,
            },
          });
          rooms.push(room);
        });
        return rooms;
      } else {
        return "가능한 방이 없습니다.";
      }
    }),
  },
};
