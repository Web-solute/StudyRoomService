import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Query: protectedResolver(async (_,{roomId},{loggedInUser})=>{
        const room = await client.room.findUnique({
            where:{
                id:roomId
            },
            include:{
                schedules:true
            }
        });
        if(!room){
            return null;
        }
        const TODAY = new Date();
        const year = String(TODAY.getFullYear());
        const month = String(TODAY.getMonth()+1);
        // (TODAY.getMonth()+1 >= 10 ? TODAY.getMonth()+1 : `0${TODAY.getMonth()+1}`);
        const date = String(TODAY.getDate());

        return await client.schedule.findMany({
            where:{
            AND:[
                { year  },
                { month },
                { date  },
                { isReserved: true},
                { rooms:{
                        some:{
                            id:room.id
                        }
                    }
                },
            ]
            }
        });
    })
}