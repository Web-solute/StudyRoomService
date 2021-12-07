import { FilterRootFields } from "apollo-server-express";
import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeReservations_room: protectedResolver(
      async (_, args, { loggedInUser }) => {
        if (!loggedInUser.id) {
          return null;
        }
        const { roomId } = args;
        return await client.reservation.findMany({
          where: {
            roomId,
          },
        });
      }
    ),
  },
};
