import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    falseQR: protectedResolver(async (_, {qr}, { loggedInUser }) => {
        const QR = await client.qRModel.findUnique({
            where:{
                qr
            }
        })
        if(QR){
            await client.user.update({
                where:{
                    id:loggedInUser.id
                },
                data:{
                    activation:false
                }
            });
            return {
                ok: true
            }
        }
      
        return {
            ok: false,
            error:"NO QR"
        }
    }),
  },
};
