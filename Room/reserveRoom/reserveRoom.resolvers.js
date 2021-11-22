import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    reserveRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, start, end } = args;
      if (!loggedInUser.isValid) {
        return {
          ok: false,
          error: "방을 예약할 수 있는 권한이 없습니다. ",
        };
      }
      if (loggedInUser.activateTime != "") {
        return {
          ok: false,
          error: "이미 다른 방을 예약하신 상태입니다.",
        };
      } //reservation에서 userId가 연동되어있는지 로 변경
      //이미예약된 시간대에 예약 불가 동반자 포함
      //+1 이후(한시간 이후로 예약 가능 ) 다음 start와 현재 finish가 동일하면 안됨
      //과 부분
      //컴퓨터공학과, 정보통신공학과
      //major enum 만들기

      const roomstart = await client.class.findFirst({
        where: {
          name: start,
          room: {
            roomNumber,
          },
        },
      });
      if (end) {
        const roomend = await client.class.findFirst({
          where: {
            name: end,
            room: {
              roomNumber,
            },
          },
        });
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
        if (end) {
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
              error: "예약할 수 없는 방입니다. 1",
            };
          }
        }
      } else {
        return {
          ok: false,
          error: "예약할 수 없는 방입니다. 2a",
        };
      }

      await client.reservation.create({
        data: {
          userId: loggedInUser.id,
          date: Date(),
          start,
          ...(end && { finish: end }),
          space: roomstart.roomId,
        },
      });
      //user actiavate time 부분 추가해야함
      return {
        ok: true,
      };
    }),
  },
};
