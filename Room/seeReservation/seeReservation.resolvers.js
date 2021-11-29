import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeReservation: protectedResolver(async (_) => {
      return await client.reservation.findMany();
    }),
  },
};
