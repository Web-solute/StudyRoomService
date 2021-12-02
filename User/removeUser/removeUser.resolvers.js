import client from "../../client"
import {protectedResolver} from "../User.utils"

export default {
    Mutation:{
        removeUser: protectedResolver(async(_, {studentId}, {loggedInUser}) => {
            if(!loggedInUser.id){
                return {
                    ok:false,
                    error:"로그인이 필요합니다"
                }
            }
            if(!loggedInUser.isManaged){
                return {
                    ok:false,
                    error:"매니저 권한이 필요합니다"
                }
            }
            const user = await client.user.findUnique({
                where:{
                    studentId
                }
            });
            if(user){
                await client.user.delete({
                    where:{
                        studentId
                    }
                });
                return {
                    ok:true
                }
            }else{
                return {
                    ok:false,
                    error:"유저없음"
                }
            }

        })
    }
}