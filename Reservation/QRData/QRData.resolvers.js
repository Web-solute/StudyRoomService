import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    QRData: protectedResolver(async (_, __, { loggedInUser }) => {
        const TODAY = new Date();
        const year = String(TODAY.getFullYear());
        const month = String(TODAY.getMonth() + 1);
        // (TODAY.getMonth()+1 >= 10 ? TODAY.getMonth()+1 : `0${TODAY.getMonth()+1}`);
        const date = String(TODAY.getDate());
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
          schedule:{
            where:{
                AND:[
                    {year},
                    {month},
                    {date}
                ]
            }
          },
          room:true,
          group:true
        }
      });
    }),
  },
};
