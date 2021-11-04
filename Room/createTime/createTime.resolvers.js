import client from "../../client";
import { protectedResolver } from "../../User/User.utils";
 
export default{
    Mutation:{
        createTime: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    name, // 1교시 2교시
                    description, // 정확한 시간
                    roomNumber
                } = args;
                try{
                    if(loggedInUser.isManaged){
                        const newTime = await client.time.create({
                            data:{
                                name,
                                description,
                                studyroom:{
                                    connect:{
                                        roomNumber:roomNumber
                                    }
                                }
                            }
                        });
                    if(newTime.id){
                            return{
                                ok:true
                            }
                        }
                    else{
                        return{
                            ok:false,
                            error:"Time 생성 실패"
                        }
                    }
                }
                else{
                    return {//ismanaged 통과 x
                        ok:false,
                        error:"권한없음"
                    }
                }
            }catch(e){
                return {
                    ok: false,
                    error: "createTime Error!"
                }
            }
            }
        )
    }
}