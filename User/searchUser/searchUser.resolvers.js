
import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
  Query: {
    searchUsers: protectedResolver(async (_, args, {loggedInUser}) => {
      if(!loggedInUser.id){
        return null;
      }
      const { keyword } = args;
      return client.user.findMany({
        where:{
          name:{
            startsWith:keyword
          }
        }
      });
    })
  }
};
//검색한 단어로 시작하는 이름 검색하기