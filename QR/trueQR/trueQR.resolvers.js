import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    trueQR: protectedResolver(async (_, {qr}, { loggedInUser }) => {
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
                    activation:true
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
