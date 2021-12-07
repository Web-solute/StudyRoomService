import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeReservations: protectedResolver(async () => {
      return await client.reservation.findMany();
    }),
  },
};
