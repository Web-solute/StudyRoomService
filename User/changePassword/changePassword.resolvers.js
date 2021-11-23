import client from "../../client"
import { sendSecretMail } from "../User.utils";
import bcrypt from "bcrypt";

export default {
    Mutation:{
        changePassword:async(_,{email}) => {
            const user = await client.user.findUnique({
                where:{
                    email
                }
            });
            if(!user){
                return {
                    ok:false,
                    error:"해당 이메일이 존재하지 않습니다!"
                }
            }
            const result = await sendSecretMail(email);
            const uglyPassword = await bcrypt.hash(result, 10);
            
            await client.user.update({
                where:{
                    id:user.id
                },
                data:{
                    password:uglyPassword
                }
            });
            return {
                ok:true
            };
        }
    }
}