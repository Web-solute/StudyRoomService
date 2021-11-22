import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    deleteRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber } = args;
      if (loggedInUser.isManaged) {
        const studyroom = await client.studyroom.findUnique({
          where: {
            roomNumber
          },
        });
        if (!studyroom) {
          return {
            ok: false,
            error: "방을 찾을 수 없습니다."
          }
        }
        else {
          await client.studyroom.delete({
            where: {
              roomNumber
            }
          });
          return {
            ok: true
          }
        }
      }
    })
  }
}