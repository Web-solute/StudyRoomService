import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    createRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, description, major, open, closed } = args;
      try {
        if(!loggedInUser.isManaged){
          return {
            ok:false,
            error:"권한 없음!"
          }
        }
        const room = await client.room.findUnique({
          where:{
            major_roomNumber:{
              major,
              roomNumber
            }
          }
        });
        if(room){
          return {
            ok:false,
            error:"이미 존재하는 방입니다!"
          }
        }
        await client.room.create({
          data:{
            major,
            roomNumber,
            description,
            open,
            closed
          }
        });
        return {
          ok:true
        }
      }catch(error) {
        return {
          ok:false,
          error:"CREATE ROOM ERROR!"
        }
      }
    }),
  },
};
