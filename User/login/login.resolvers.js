import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, args) => {
      const { studentId, password } = args;
      const existUser = await client.user.findFirst(
        {
          where: {
            studentId
          }
        }
      );
      if (!existUser) {
        return {
          ok: false,
          error: "존재하지 않는 사용자입니다."
        }
      }
      const passwordOk = await bcrypt.compare(password, existUser.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "비밀번호가 틀렸습니다!"
        }
      }
      const token = await jwt.sign({ id: existUser.id }, process.env.SECRET_KEY);
      if (token) {
        return {
          ok: true,
          token
        }
      }
    }
  },
}