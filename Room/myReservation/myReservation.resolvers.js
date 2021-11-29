import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    myReservation: protectedResolver(async (_, __, { loggedInUser }) => {
      return await client.reservation.findMany({
        where: {
          userId: loggedInUser.id,
        },
      });
    }),
  },
};
