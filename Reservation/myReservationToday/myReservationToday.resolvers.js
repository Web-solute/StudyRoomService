import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    myReservationToday: protectedResolver(async (_, __, { loggedInUser }) => {
        const TODAY = new Date();
        const year = String(TODAY.getFullYear());
        const month = String(TODAY.getMonth() + 1);
        // (TODAY.getMonth()+1 >= 10 ? TODAY.getMonth()+1 : `0${TODAY.getMonth()+1}`);
        const date = String(TODAY.getDate());
        const schedules = await client.schedule.findMany({
            where:{
                AND:[
                    {year},
                    {month},
                    {date}
                ]
            }
        }); 
        const scheduleId = schedules.map((schedule)=>(schedule.id));
        
        return client.reservation.findMany({
          where: {
            OR:[
              {userId: loggedInUser.id},
              {group:{
                some:{
                  id:loggedInUser.id
                }
              }},
            ],
            AND:[
                {schedule:{
                    some:{
                      id:{
                          in:scheduleId
                      }
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
