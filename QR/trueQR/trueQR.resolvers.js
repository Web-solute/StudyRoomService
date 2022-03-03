import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    trueQR: protectedResolver(async (_, {qr}, { loggedInUser }) => {
        await client.qRModel.update({
            where:{
                qr
            },
            data:{
                activate:true
            }
        });
      
        return {
            ok: true
        }
    }),
  },
};
