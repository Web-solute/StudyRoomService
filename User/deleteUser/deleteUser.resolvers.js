import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../User.utils";

export default {
    Mutation:{
        deleteUser: protectedResolver(
            async (_,args,{loggedInUser}) => {
                const {
                    studentId,
                    password // 삭제하고자 하는 아이디의 password
                } = args;
               if(loggedInUser.isManaged){// 관리자 계정인 경우 입력한 학번 삭제 가능
                   await client.user.delete({where:{ //있으면 삭제
                       studentId
                   }});
                   return{
                        ok:true
                    }
               }else{ // 관리자 계정이 아닌경우
                    await client.user.findFirst({ // 입력한 학번을 찾음
                        where:{studentId}
                    })
                    if(!user){ // 입력한 학번이 없으면
                        return {
                            ok:false,
                            error: "등록된 학번이 없습니다. 삭제 실패"
                        }
                    }
                    const checkPassword = await bcrypt.compare(password,user.password);
                    if(!checkPassword){
                        return {
                            ok:false,
                            error: "비밀번호가 맞지 않습니다. 삭제 실패",
                            
                        };
                    }
                    await client.user.delete({where:{ // 학번도 있고 비밀번호도 맞으면 삭제(유저의 경우)
                        studentId
                    }});
                    return{
                         ok:true
                    }
                    
            }
        }
        )
    }
}