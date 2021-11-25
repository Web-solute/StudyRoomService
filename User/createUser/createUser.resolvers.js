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
            OR:[
              {studentId},
              {email}
            ]
          }
        });
        if (existingUser) {
          return {
            ok: false,
            error: "이미 존재하는 사용자 혹은 이메일입니다."
          }
        }
        else {
          let idCardUrl = null;
          idCardUrl = await uploadPhotos(idCard, studentId, "User");

          if(idCardUrl === null){
            return {
              ok:false,
              error:"학생증 사진을 넣어주세요!"
            }
          }

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