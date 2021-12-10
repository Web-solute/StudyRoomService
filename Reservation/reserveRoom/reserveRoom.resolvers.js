import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    reserveRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { major, roomNumber, start, finish, mem } = args;
      if (!loggedInUser.isValid) {
        return {
          ok: false,
          error: "방을 예약할 수 있는 권한이 없습니다. ",
        };
      }
      const reserveroom = await client.room.findUnique({
        where: { 
          major_roomNumber:{
            major,
            roomNumber
          }
        },
      });
      if (!reserveroom) {
        return {
          ok: false,
          error: "존재하지 않는 방입니다.",
        };
      }
      
    }),
  },
};
