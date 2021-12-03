import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    cancleRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, _start, _finish } = args;

      if (!loggedInUser.isValid) {
        return {
          ok: false,
          error: "방을 취소할 수 있는 권한이 없습니다.",
        };
      }

      const canclereserveroom = await client.room.findFirst({
        where: { roomNumber },
      });

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

      if (!canclereserveroom) {
        return {
          ok: false,
          error: "존재하지 않는 방입니다.",
        };
      }
      else {
        if (!roomstart || !roomend) {
          return {
            ok: false,
            error: "존재하지 않는 예약 시간입니다.",
          };
        }
        else {
          await client.reservation.delete({
            where: { _start, _finish },
          })
          return {
            ok: true
          }
        }
      }
    }),
  },
};