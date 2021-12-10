import client from "../../client"
import { CLASS } from "../../constant";

export default {
    Mutation:{
        createSchedule: async () =>{
            const rooms = await client.room.findMany({
                select:{id:true},
                orderBy:{createdAt:'asc'}
            });
            const TODAY = new Date();
            const year = TODAY.getFullYear();
            const month = TODAY.getMonth();
            // (TODAY.getMonth()+1 >= 10 ? TODAY.getMonth()+1 : `0${TODAY.getMonth()+1}`);
            const date = TODAY.getDate();
            CLASS.map(async (time,i) => {
                if(i == CLASS.length-1){
                    await client.schedule.create({
                        data:{
                            year,
                            month,
                            date,
                            start:time,
                            finish:CLASS[0]
                        }
                    });
                }else{
                    await client.schedule.create({
                        data:{
                            year,
                            month,
                            date,
                            start:time,
                            finish:CLASS[i+1]
                        }
                    });
                }
            })
            // await client.schedule.create({
            //     data:{
            //         year,
            //         month,
            //         date,
            //     }
            // });
            const roomsObj = rooms.map((room)=>{
                // console.log(room.id);
            })
        }
    }
}