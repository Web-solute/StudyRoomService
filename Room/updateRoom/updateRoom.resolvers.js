import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    updateRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, description, open, closed } = args;
      if (loggedInUser.isManaged) {

        const updatedRoom = await client.studyroom.update({
          where: {
            id: Studyroom.id,
          },
          data: {
            roomNumber,
            description,
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
