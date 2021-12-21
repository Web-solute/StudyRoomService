import { withFilter } from "apollo-server-express";
import client from "../../client";
import { ADD_MEMBER } from "../../constant";
import pubsub from "../../pubsub";

export default {
    Subscription:{
        reservationAlarm:{
            subscribe: async (root,args,context,info) => {
                //reservation이 존재하는지 확인
                //user가 reservation에 참여했는지 확인
                const reservation = await client.reservation.findFirst({
                    where:{
                        id:args.id
                    }
                });
                const user = await client.user.findUnique({where:{id:context.loggedInUser.id}})
                if(!reservation || !user){
                    throw new Error("실시간 감지 실패")
                }
                return withFilter(
                    () => pubsub.asyncIterator(ADD_MEMBER),
                    ({reservationAlarm},{id}) => {
                        return reservationAlarm.id === id;
                    }// addMember를한 reservation과 subscription하는 reservation의 id값이 같은지 확인
            
                )(root,args,context,info);
            }
        }
    }
}