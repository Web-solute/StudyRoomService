import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createUser: async (_, args) => {
      const {
        studentId,
        name,
        password,
        major,
        campus
      } = args;
      try {
        const existingUser = await client.user.findFirst({
          where: {
            studentId
          }
        });
        if (existingUser) {
          throw new Error("이미 존재하는 사용자입니다!");
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            studentId,
            name,
            password: uglyPassword,
            major,
            campus
          }
        });

        return {
          ok: true
        }
      } catch (e) {
        return {
          ok: false,
          error: "계정 생성 실패"
        };
      }
    },
  },
}