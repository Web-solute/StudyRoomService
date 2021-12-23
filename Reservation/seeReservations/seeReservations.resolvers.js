import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    seeReservations: protectedResolver(async (_,{roomId},{loggedInUser}) => {
      if (!loggedInUser.isValid) {
        return null;
      }
      if(roomId){
        return client.reservation.findMany({
          where: {
            roomId,
          },
        });
      }
      return client.reservation.findMany();
    }),
  },
};
