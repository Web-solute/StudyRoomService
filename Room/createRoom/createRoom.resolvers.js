import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    createRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      const { roomNumber, description, open, closed } = args;
      try {
        if (loggedInUser.isManaged) {
          const exists = await client.studyroom.findFirst({
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
            const newRoom = await client.studyroom.create({
              data: {
                roomNumber,
                description,
                open,
                closed,
              },
            });
            const newSchedule = await client.time.create({
              data: {
                studyroom: {
                  connect: {
                    id: newRoom.id,
                  },
                },
              },
            });
            for (var i = 1; i <= 8; i++) {
              await client.class.create({
                data: {
                  name: i,
                  time: {
                    connect: {
                      id: newSchedule.id,
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
