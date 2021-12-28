import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    myReservation: protectedResolver(async (_, __, { loggedInUser }) => {
      return client.reservation.findMany({
        where: {
          OR:[
            {userId: loggedInUser.id},
            {group:{
              some:{
                id:loggedInUser.id
              }
            }}
          ]
        },
        include:{
          schedule:true,
          room:true,
          group:true
        }
      });
    }),
  },
};
