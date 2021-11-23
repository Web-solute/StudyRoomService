import client from "../../client"

export default {
    Mutation:{
        removeUser:async(_, {studentId}) => {
            //매니저 권한으로 변경해두기 + protectedResolver 추가
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

        }
    }
}