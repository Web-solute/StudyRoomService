import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    updateRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { id, roomNumber, description, major, open, closed } = args;
      try{
        if(!loggedInUser.isManaged){
          return{
            ok:false,
            error:"권한이 없습니다!"
          }
        }
        const updateRoom = await client.room.update({
          where:{
            id
          },
          data:{
            roomNumber,
            description,
            major,
            open,
            closed
          }
        });
        if(!updateRoom.id){
          return{
            ok:false,
            error:"다시 시도해주세요"
          }
        }
        return {
          ok:true
        }
      }catch(e){
        return {
          ok:false,
          error:"UPDATE ROOM ERROR"
        }
      }
    }),
  },
};
