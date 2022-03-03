import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    allFalseQR: protectedResolver(async (_, {qr}, { loggedInUser }) => {
        const update = await client.qRModel.updateMany({
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
