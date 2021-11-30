import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    updateRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, description, major, open, closed } = args;
      if (loggedInUser.isManaged) {
        const updatedRoom = await client.room.update({
          where: {
            id: Room.id,
          },
          data: {
            roomNumber,
            description,
            major,
            open,
            closed,
          },
        });

        if (updatedRoom.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "업데이트 실패",
          };
        }
      } else {
        return {
          ok: false,
          error: "권한 없음",
        };
      }
    }),
  },
};
