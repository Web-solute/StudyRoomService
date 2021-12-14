import jwt from "jsonwebtoken";
import client from "../client";
import nodemailer from "nodemailer";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "로그인이 필요합니다!",
        };
      }
    }
    return ourResolver(root, args, context, info);
};


export const generateSecret = () => {
    const randomPassword = Math.random().toString(36).substr(2,11);
    return randomPassword;
}

export const sendSecretMail = async (email) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    host:'smtp.gmail.com',
    port:587,
    auth:{
      user:process.env.USER,
      pass:process.env.PASSWORD
    }
  });

  const secret = generateSecret();
  
  await transporter.sendMail({
    from:process.env.USER,
    to:email,
    subject:"🔒HOOPS 임시 비밀번호 발급🔒",
    html:`안녕하세요 Websolute입니다!<br/>아래의 임시 비밀번호로 로그인한 뒤 비밀번호를 수정해주세요<br/><strong>${secret}</strong>`
  });

  return secret;
}