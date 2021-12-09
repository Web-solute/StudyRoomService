import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
    Mutation: {
        changeRoom: protectedResolver(async(_,args,{loggedInUser}) => {
            const { roomNumber, changeRoomNumber, _start, _finish, mem, _changestart, _changefinish } = args;
            //change 붙은건 기존에 예약 한거 변경 위해 추가함
            // 기존에 없던 멤버를 멤버에 추가해서 받을때 어떻게 해야함..?
            // 예약이 취소되면 그 예약 안에 있는 예약자, 동반자 예약 취소를 확인해야함.
            const useralready = await client.reservation.findMany({ 
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


            if(!useralready){ // 예약하는 유저, 멤버의 예약 내역 존재하나 확인
                return{
                    ok:false,
                    error:"예약 변경을 진행할 예약자의 예약 내역이 없습니다."
                }
            }

            if (mem) {
              for (var i = 0; i < mem.length; i++) {// 이거 변경 되면 해보라고하심
                const member = await client.user.findFirst({
                  where: {
                    studentId: mem[i],
                  },
                });
      
                const memberalready = await client.reservation.findMany({
                  where: {
                      OR: [
                        {
                          userId: member.id,
                        },
                        {
                          group: {
                            some: {
                              id: member.id,
                            },
                          },
                        },
                      ],
                  },
                });
                if(!memberalready){ // 예약하는 유저, 멤버의 예약 내역 존재하나 확인
                  return{
                      ok:false,
                      error:"예약 변경을 진행할 멤버의 예약 내역이 없습니다."
                  }
              }
            }
          }
          

          
            if (!loggedInUser.isValid){
                return{
                    ok:false,
                    error:"방 예약을 변경 할 수 있는 권한이 없습니다."
                };
            }
            

            const reserveroom = await client.room.findFirst({
              where: { roomNumber },
            });
            const changedroom = await client.room.findFirst({
              where:{ roomNumber:changeRoomNumber },
            });

            if (!reserveroom) {
              return {
                ok: false,
                error: "존재하지 않는 방입니다.",
              };
            }
            
            if (!changedroom) {
              return {
                ok: false,
                error: "예약 변경하고자 하는 방이 존재하지 않습니다.",
              };
            }


            if (loggedInUser.major != reserveroom.major) {
              return {
                ok: false,
                error: loggedInUser.major + " 학과는 예약할 수 없는 방입니다.",
              };
            } 
            
            if (mem) {
              if (mem.length > 4) {
                //예역자 포함 최대 5명
                return {
                  ok: false,
                  error: "예약자 포함 최대 5명까지 예약 가능합니다. ",
                };
              }

              
      
              for (var i = 0; i < mem.length; i++) {
                //동반자 예약 가능 여부 확인
                const valid = await client.user.findFirst({
                  where: {
                    studentId: mem[i],
                  },
                });
      
                if (!valid || !valid.isValid) {
                  return {
                    ok: false,
                    error:
                      "학생" +
                      mem[i] +
                      " 은(는) 방을 예약할 수 있는 권한이 없습니다. ",
                  };
                }

                if(mem.major != reserveroom.major){
                  return{
                    ok: false,
                    error:"학생"+mem[i]+"의 학과가 해당 스터디룸의 학과와 달라 예약할 수 없습니다."
                  }
                }

              }
            }


            //기존에 예약한 class를 false로 만드는 부분 필요
          
          const initroomstart = await client.class.findFirst({
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
          if (initroomstart.isReserved == true) {
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
                  error: "예약 변경할 수 없는 방입니다.",
                };
              }
            }
          } else {
            return {
              ok: false,
              error: "예약 변경할 수 없는 방입니다.",
            };
          }

      const roomstart = await client.class.findFirst({ 
        where: {
          name: _changestart,
          room: {
            roomNumber:changeRoomNumber,
          },
        },
      });
      var roomend;
      if (_changefinish) {
        roomend = await client.class.findFirst({
          where: {
            name: _changefinish,
            room: {
              roomNumber:changeRoomNumber,
            },
          },
        });
      }
      if (!roomstart) {
        return {
          ok: false,
          error: "존재하지 않는 방입니다.",
        };
      }
      if (roomstart.isReserved == false) {
        await client.class.update({
          where: {
            id: roomstart.id,
          },
          data: {
            isReserved: true,
          },
        });
        if (_changefinish) {
          if (roomend.isReserved == false) {
            await client.class.update({
              where: {
                id: roomend.id,
              },
              data: {
                isReserved: true,
              },
            });
          } else {
            return {
              ok: false,
              error: "예약할 수 없는 방입니다.",
            };
          }
        }
      } else {
        return {
          ok: false,
          error: "예약할 수 없는 방입니다.",
        };
      }

      const findsome = await client.reservation.findFirst({ // 예약 존재하는거 찾음
        where:{
          userId:loggedInUser.id
        },
      })
      if(findsome){
        ok: true;
      }
      else{
        ok:false;
        error:"예약이 없습니다!.."
      }
      
      
      const event = Date();


      const changeReserve = await client.reservation.update({   // 기존에 있던 예약 변경
        where: {
          id:findsome.id
        },
        data: {
          date: event.toString(), // 형변환 
          start: _changestart,
          ...(_changefinish && { finish: _changefinish }),
          room:{ // 방을 예약 변경하고자 하는 방으로 변경
            connect:{
              id:changedroom.id 
            }
          },
          /*
          group:{
            mem // 그룹원들 다 추가해야함
          }
          */
         
        },
      });

      if (changeReserve && mem) { // 동반자도 있고 예약 변경도 됐으면 user에 멤버추가
        for (var i = 0; i < mem.length; i++) {
          await client.user.update({
            where: { studentId: mem[i] },
            data: {
              member: {
                connect: {
                  id: changeReserve.id,
                },
              },
            },
          });
        }
      }
          
      //권한 확인 다 끝  
          return {
            ok: true,
          };
        }),
    }
}

// 동반자 포함 예약자의 예약 내역을 모두 변경해야함.
