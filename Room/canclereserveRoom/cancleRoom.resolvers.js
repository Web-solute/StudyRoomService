import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    cancleRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, _start, _finish } = args;

      if (!loggedInUser.isValid) {
        return {
          ok: false,
          error: "방 예약을 취소할 수 있는 권한이 없습니다.",
        };
      }

      const existReservation = await client.reservation.findMany({ 
        where: {
            OR: [
              {
                userId: loggedInUser.id,
              },
              {
                group: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            ],
        },
      });

      if(!existReservation){ // 예약하는 유저, 멤버의 예약 내역 존재하나 확인
        return{
            ok:false,
            error:"예약 취소를 진행할 예약자의 예약 내역이 없습니다."
        }
    }


      const canclereserveroom = await client.room.findFirst({
        where: { roomNumber },
      });

      if (!canclereserveroom) {
        return {
          ok: false,
          error: "존재하지 않는 방입니다.",
        };
      }


      const findreservation = await client.reservation.findFirst({ // 예약 존재하는거 찾음
        where:{
          userId:loggedInUser.id
        },
      })

      if(findreservation.userId != loggedInUser.id){
        ok:false,
        error 
        error: "예약자 본인이 아닙니다."
      }

      const initroomstart = await client.class.findFirst({ // class부분 초기화
        where: {
          name: _start,
          room: {
            roomNumber,
          },
        },
      });
      var initroomend;
      if (_finish) {
        initroomend = await client.class.findFirst({
          where: {
            name: _finish,
            room: {
              roomNumber
            },
          },
        });
      }
      if (!initroomstart) {
        return {
          ok: false,
          error: "존재하지 않는 방입니다.",
        };
      }
      if (initroomstart.isReserved == true) { // isreserved 취소하는 부분
        await client.class.update({
          where: {
            id: initroomstart.id,
          },
          data: {
            isReserved: false,
          },
        });
        if (_finish) {
          if (initroomend.isReserved == true) {
            await client.class.update({
              where: {
                id: initroomend.id,
              },
              data: {
                isReserved: false,
              },
            });
          } else {
            return {
              ok: false,
              error: "예약 취소할 수 없는 방입니다.",
            };
          }
        }
      } else {
        return {
          ok: false,
          error: "예약 취소할 수 없는 방입니다.",
        };
      }

      const cancleReserve = await client.reservation.delete({
        where:{
          id:findreservation.id
        },
      })

      if(!cancleReserve){
        return{
          ok:false,
          error: "취소실패"
        }
      }

      
      
      
      
      return {
        ok: true,
      };

      //동반자들 예약.. 건드려야하나?
    }),
  },
};