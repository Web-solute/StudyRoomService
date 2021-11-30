import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        managedUser: protectedResolver(
            async (_,{id},{loggedInUser}) => {
                try{
                    if(loggedInUser.isManaged){
                        const exists = await client.user.findUnique({
                            where:{
                                id
                            }
                        });
                        if(exists.id){
                            const isManager = !exists.isManaged;
                            await client.user.update({
                                where:{
                                    id
                                },
                                data:{
                                    isManaged:isManager
                                }
                            })
                            return{
                                ok:true
                            }
                        }else{
                            return {
                                ok:false,
                                error: "사용자가 존재하지 않습니다."
                            }
                        }
                    }else{
                        return {
                            ok:false,
                            error:"권한 없음!"
                        }
                    }
                }catch(e){
                    return {
                        ok: false,
                        error: "Error!"
                    }
                }
            }),
        verifiedUser: protectedResolver(
                async (_,{id},{loggedInUser}) => {
                    try{
                        if(loggedInUser.isManaged){
                            const exists = await client.user.findUnique({
                                where:{
                                    id
                                }
                            });
                            if(exists.id){
                                const isVerified = !exists.isValid;
                                await client.user.update({
                                    where:{
                                        id
                                    },
                                    data:{
                                        isValid:isVerified
                                    }
                                })
                                return{
                                    ok:true
                                }
                            }
                            else{
                                return {
                                    ok:false,
                                    error: "사용자가 존재하지 않습니다."
                                }
                            }
                        }else{
                            return {
                                ok:false,
                                error:"권한 없음!"
                            }
                        }
                    }catch(e){
                        return {
                            ok: false,
                            error: "Error!"
                        }
                    }
         })
    }
}