import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    reserveRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, _start, _finish, mem } = args;
      if (!loggedInUser.isValid) {
        return {
          ok: false,
          error: "방을 예약할 수 있는 권한이 없습니다. ",
        };
      }
      const reserveroom = await client.room.findFirst({
        where: { roomNumber },
      });
      if (!reserveroom) {
        return {
          ok: false,
          error: "존재하지 않는 방입니다.",
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
          if (valid.major != reserveroom.major) {
            return {
              ok: false,
              error:
                mem[i] + " 학생은 학과가 다르므로 예약할 수 없는 방입니다.",
            };
          }
        }
      }

      /*
      mem.map(async (student) => {
        const valid = await client.user.findFirst({
          where: {
            studentId: student,
          },
        });

        if (!valid || !valid.isValid) {
          return {
            ok: false,
            error:
              "학생" +
              student +
              " 은(는) 방을 예약할 수 있는 권한이 없습니다. ",
          };
        }
      });

      mem.forEach(async function (student) {
        const valid = await client.user.findFirst({
          where: {
            studentId: student,
          },
        });

        if (!valid || !valid.isValid) {
          return {
            ok: false,
            error:
              "학생" +
              student +
              " 은(는) 방을 예약할 수 있는 권한이 없습니다. ",
          };
        }
      });*/
      const useralready = await client.reservation.findMany({
        where: {
          OR: [
            {
              start: _start,
            },
            {
              start: _finish,
            },
            {
              finish: _start,
            },
            {
              finish: _finish,
            },
          ],
          AND: {
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
        },
      });

      if (useralready.length > 0) {
        return {
          ok: false,
          error: "이미 중복되는 시간대에 다른 방을 예약하신 상태입니다.",
        };
      }

      if (mem) {
        for (var i = 0; i < mem.length; i++) {
          const member = await client.user.findFirst({
            where: {
              studentId: mem[i],
            },
          });

          const memberalready = await client.reservation.findMany({
            where: {
              OR: [
                {
                  start: _start,
                },
                {
                  start: _finish,
                },
                {
                  finish: _start,
                },
                {
                  finish: _finish,
                },
              ],
              AND: {
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
            },
          });
          if (memberalready.length > 0) {
            return {
              ok: false,
              error:
                "학생 " +
                mem[i] +
                " 은(는) 이미 중복되는 시간대에 다른 방을 예약하신 상태입니다.",
            };
          }
        }
      }

      const roomstart = await client.class.findFirst({
        where: {
          name: _start,
          room: {
            roomNumber,
          },
        },
      });
      var roomend;
      if (_finish) {
        roomend = await client.class.findFirst({
          where: {
            name: _finish,
            room: {
              roomNumber,
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
        if (_finish) {
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
      var finish;
      if (_finish) {
        finish = _finish;
      } else {
        finish = _start;
      } //한시간 예약한다면 finish도 start로 설정
      const reserve = await client.reservation.create({
        data: {
          date: Date(),
          start: _start,
          finish,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          room: {
            connect: {
              id: reserveroom.id,
            },
          },
        },
      });

      if (reserve && mem) {
        /*
        mem.forEach(async function (student) {
          await client.user.update({
            where: { studentId: student },
            data: {
              member: {
                connect: {
                  id: reserve.id,
                },
              },
            },
          });
        }); */

        for (var i = 0; i < mem.length; i++) {
          await client.user.update({
            where: { studentId: mem[i] },
            data: {
              member: {
                connect: {
                  id: reserve.id,
                },
              },
            },
          });
        }
      }
      //user actiavate time 부분 추가해야함
      return {
        ok: true,
      };
    }),
  },
};
