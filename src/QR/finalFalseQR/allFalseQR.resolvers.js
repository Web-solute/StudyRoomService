import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    allFalseQR: protectedResolver(async (_, {qr}, { loggedInUser }) => {
        const update = await client.user.updateMany({
            data:{
                activation:false
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
