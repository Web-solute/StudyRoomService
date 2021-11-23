import bcrypt from "bcrypt";
import client from "../../client";
import { uploadPhotos } from "../../utils";

export default {
  Mutation: {
    createUser: async (_, args) => {
      const {
        studentId,
        name,
        password,
        major,
        campus,
        idCard,
        email
      } = args;

      try {
        const existingUser = await client.user.findFirst({
          where: {
            studentId
          }
        });
        if (existingUser) {
          return {
            ok: false,
            error: "이미 존재하는 사용자입니다."
          }
        }
        else {
          let idCardUrl = null;
          idCardUrl = await uploadPhotos(idCard, studentId, "User");

          const uglyPassword = await bcrypt.hash(password, 10);

          const newUser = await client.user.create({
            data: {
              studentId,
              name,
              password: uglyPassword,
              major,
              campus,
              email,
              ...(idCardUrl && { idCard: idCardUrl })
            }
          });

          if (newUser.id) {
            return {
              ok: true
            }
          } else {
            return {
              ok: false,
              error: "계정 생성 실패!"
            }
          }
        }
      } catch (e) {
        return e;
      }
    }
  }
}