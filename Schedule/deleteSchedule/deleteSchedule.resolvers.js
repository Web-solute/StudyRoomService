import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        deleteSchedule:protectedResolver(async (_,{scheduleId},{loggedInUser})=>{
            if(!loggedInUser.isManaged){
                return {
                    ok:false,
                    error:"권한 없음!"
                }
            }
            const schedule = await client.schedule.findUnique({where:{id:scheduleId}});
            if(schedule){
                await client.schedule.delete({
                    where:{
                        id:schedule.id
                    }
                });
                return {
                    ok:true
                }
            }
            return {
                ok:false,
                error:"스케줄이 존재하지 않습니다!"
            }
        })
    }
}