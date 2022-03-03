import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    falseQR: protectedResolver(async (_, {qr}, { loggedInUser }) => {
        const update = await client.qRModel.update({
            where:{
                qr
            },
            data:{
                activate:false
            }
        });
        if(!update){
            return {
                ok: false
            }
        }
        return {
            ok: true
        }
    }),
  },
};
