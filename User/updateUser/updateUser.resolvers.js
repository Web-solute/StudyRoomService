import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../User.utils";

export default {
  Mutation: {
    updateUser: protectedResolver(async (_, args, { loggedInUser }) => {
      const { name, password, major } = args;
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          name,
          major,
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
