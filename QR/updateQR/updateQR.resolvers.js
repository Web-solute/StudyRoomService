import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    updateQR: protectedResolver(async (_, {id,qr}, { loggedInUser }) => {
        const QRData = await client.qRModel.findUnique({where:{id}})
        if(QRData){
            await client.qRModel.update({
                where:{
                    id
                },
                data:{
                    qr
                }
            })
            return {
                ok:true,
            }
        }
        else{
            return {
                ok:false,
                error:"QR 변경 실패!"
            }
        }
    }),
  },
};
