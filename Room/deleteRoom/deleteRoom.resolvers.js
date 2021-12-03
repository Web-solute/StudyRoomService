import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    deleteRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { id } = args;
      if (loggedInUser.isManaged) {
        const room = await client.room.findUnique({
          where: {
            id
          },
        });
        if (!room) {
          return {
            ok: false,
            error: "방을 찾을 수 없습니다."
          }
        }
        else {
          await client.room.delete({
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