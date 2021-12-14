import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        addMember: protectedResolver(async (_,args,{loggedInUser})=> {
            const {reservationId, group} = args;
            if(!loggedInUser.isValid){
                return {
                    ok:false,
                    error:"권한없음"
                }
            }
            const myReservation = await client.reservation.findUnique({
                where:{
                    id:reservationId
                },
                include:{
                    group:true
                }
            });
            if(myReservation.userId != loggedInUser.id){
                return {
                    ok:false,
                    error:"본인의 예약만 접근할 수 있습니다!"
                }
            }
            if(myReservation.group.length > 3){
                return {
                    ok:false,
                    error:"추가할 인원이 초과 되었습니다!"
                }
            }
            group.map(async (studentId) => {
                await client.reservation.update({
                    where:{
                        id:myReservation.id
                    },
                    data:{
                        group:{
                            connect:{
                                studentId
                            }
                        }
                    }
                })
            });
            return {
                ok: true
            }

        })
    }
}