import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    createQR: protectedResolver(async (_, {qr}, { loggedInUser }) => {
        const QRData = await client.qRModel.create({
            data:{
                qr
            }
        });
        if(QRData){
            return {
                ok:true,
            }
        }
        else{
            return {
                ok:false,
                error:"QR 생성 실패!"
            }
        }
    }),
  },
};
