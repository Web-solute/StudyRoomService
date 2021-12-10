import client from "../../client"
import { CLASS } from "../../constant";
import cron from "node-cron";

export default {
    Mutation:{
        createSchedule: async () =>{
            const rooms = await client.room.findMany({
                select:{id:true},
                orderBy:{createdAt:'asc'}
            });
            const TODAY = new Date();
            const year = String(TODAY.getFullYear());
            const month = String(TODAY.getMonth()+1);
            // (TODAY.getMonth()+1 >= 10 ? TODAY.getMonth()+1 : `0${TODAY.getMonth()+1}`);
            const date = String(TODAY.getDate());
            const roomsObj = rooms.map(async (room)=>{
                CLASS.map(async (time,i) => {
                    if(i == CLASS.length-1){
                        const schedules = await client.schedule.create({
                            data:{
                                year,
                                month,
                                date,
                                start:time,
                                finish:CLASS[0]
                            }
                        });
                        await client.room.update({
                            where:{id:room.id},
                            data:{
                                schedules:{
                                    connect:{
                                        id:schedules.id
                                    }
                                }
                            }
                        });
                    }else{
                        const schedules = await client.schedule.create({
                            data:{
                                year,
                                month,
                                date,
                                start:time,
                                finish:CLASS[i+1]
                            }
                        });
                        await client.room.update({
                            where:{id:room.id},
                            data:{
                                schedules:{
                                    connect:{
                                        id:schedules.id
                                    }
                                }
                            }
                        });
                    }
                });
            })
        }
    }
}

