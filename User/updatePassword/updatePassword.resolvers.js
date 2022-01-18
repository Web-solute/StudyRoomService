import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../User.utils";

export default {
  Mutation: {
    updatePassword: protectedResolver(async (_, args, { loggedInUser }) => {
        const { password, newPassword } = args;
        let hashedPassword = null;
        if(!loggedInUser){
          return {
              ok:false,
              error:"로그인 후 이용가능"
          }
        }
        const passwordOk = await bcrypt.compare(password, loggedInUser.password);
        if(!passwordOk){
            return {
                ok:false,
                error:"비밀번호가 틀립니다!"
            }
        }
        hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            ...(hashedPassword && { password: hashedPassword }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "업데이트 실패",
          };
        }
    }),
  },
};
