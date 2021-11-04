import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default { 
    Mutation:{
        createRoom: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    roomNumber,
                    description,
                    roomPassword // 기본값만 설정
                } = args;
                try{
                    if(loggedInUser.isManaged){ // 관리자의 경우에만 room 생성
                        const newStudyroom = await client.studyroom.create({
                                data:{
                                    roomNumber,
                                    description,
                                    roomPassword
                                }
                            });
                        if(newStudyroom.id){ //생성 됐으면
                                return{
                                    ok:true
                                }
                        }else{
                            return{
                                    ok:false,
                                    error:"Studyroom 생성 실패"
                                }
                        }
                    }else{// 관리자 아니면
                        return {
                            ok:false,
                            error:"권한 없음"
                        }
                    }
                }catch(e){
                    return {
                        ok: false,
                        error: "createRoom Error"
                    }
                }
            }
        )
    }
}