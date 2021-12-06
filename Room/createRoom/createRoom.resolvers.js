import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    createRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, description, major, open, closed } = args;
      const times = [1,2,3,4,5,6,7,8];
      try {
        if (loggedInUser.isManaged) {
          const exists = await client.room.findFirst({
            where: {
              roomNumber,
            },
          });
          if (exists) {
            return {
              ok: false,
              error: "이미 데이터가 있습니다.",
            };
          } else {
            const newRoom = await client.room.create({
              data: {
                roomNumber,
                description,
                major,
                open,
                closed,
              },
            });
            for (const time of times) {
              await client.class.create({
                data: {
                  name: time,
                  room: {
                    connect: {
                      id: newRoom.id,
                    },
                  },
                },
              });
            }

            if (newRoom.id) {
              return {
                ok: true,
              };
            } else {
              return {
                ok: false,
                error: "Room 생성 실패!",
              };
            }
          }
        } else {
          return {
            ok: false,
            error: "권한 없음",
          };
        }
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    }),
  },
};
