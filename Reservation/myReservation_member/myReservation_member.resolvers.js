import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    myReservation_member: protectedResolver(async (_, __, { loggedInUser }) => {
      return await client.reservation.findMany({
        where: {
          group: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      });
    }),
  },
};
