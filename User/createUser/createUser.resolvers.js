import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createUser: async (_, args) => {
      const {
        name,
        studentId,
        major,
        password
      } = args;
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              { studentId },
              { name }
            ]
          }
        });
        if (existingUser) {
          throw new Error("이미 존재하는 사용자입니다!");
        }
        const uglyPassword = await bcrypt.hash(password, 10);

        await client.user.create({
          data: {
            studentId,
            major,
            name,
            password: uglyPassword
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