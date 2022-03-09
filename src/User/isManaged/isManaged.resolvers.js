import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation:{
        isManaged: protectedResolver(
            async (_,{id},{loggedInUser}) => {
                try {
                    if(loggedInUser.isManaged){
                        const exists = await client.user.findUnique({where:{id}});
                        if(exists){
                            const isManaged = !exists.isManaged;
                            await client.user.update({
                                where:{id},
                                data:{isManaged}
                            });
                            return {
                                ok:true
                            }
                        }else {
                            return{
                                ok:false,
                                error:"사용자가 존재하지 않습니다!"
                            }
                        }
                    }
                }catch{
                    return {
                        ok:false,
                        error:"IsManaged Error"
                    }
                }
            }
        )
    }
}