import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    deleteRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { id } = args;
      if (!loggedInUser.isManaged) {
        return {
          ok:false,
          error:"권한 없음!"
        }
      }
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
      await client.room.delete({
        where: {
          id
        }
      });
      return {
        ok: true
      }
    })
  }
}