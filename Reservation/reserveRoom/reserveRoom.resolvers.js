import client from "../../client";
import { CLASS } from "../../constant";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    reserveRoom: protectedResolver(async (_, args, { loggedInUser }) => {
      //당일 예약 알고리즘
      //연속 예약 관련 부분은 프론트에서 짤지? --> 일단 두시간 이상은 예약 불가
      const { major, roomNumber, classes } = args;
      if (!loggedInUser.isValid) {
        return {
          ok: false,
          error: "방을 예약할 수 있는 권한이 없습니다. ",
        };
      }
      const reserveroom = await client.room.findUnique({
        where: {
          major_roomNumber: {
            major,
            roomNumber,
          },
        },
        include: {
          schedules: true,
        },
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
          error: "본인 학과의 세미나실만 예약하실수 있습니다!",
        };
      }

      if (classes[classes.length - 1] - classes[0] > 3) {
        return {
          ok: false,
          error: "최대 2시간까지만 예약 가능합니다!",
        };
      }
      //4,7 이거댐
      // 띄엄띄엄 안대야함 한번에 하나의 타임이고 연속적이어야함 (1,2,3) O {(1,3) X} ==> O
      const TODAY = new Date();
      const year = String(TODAY.getFullYear());
      const month = String(TODAY.getMonth() + 1);
      // (TODAY.getMonth()+1 >= 10 ? TODAY.getMonth()+1 : `0${TODAY.getMonth()+1}`);
      const date = String(TODAY.getDate());

      let schedules = [];

      for (const time of classes) {
        //[1,2,3]
        //classes의 값들이 scheduleDates안에 포함되는가?
        const scheduleTime = await client.schedule.findFirst({
          where: {
            AND: [
              { class: String(time) },
              { year },
              { month },
              { date },
              { userId: loggedInUser.id },
            ],
          },
        });
        if (scheduleTime) {
          return {
            ok: false,
            error: "중복되는 시간에 예약 내역이 있습니다.",
          };
        }
        const scheduleDates = await client.schedule.findFirst({
          where: {
            AND: [
              { class: String(time) },
              { year },
              { month },
              { date },
              {
                rooms: {
                  some: {
                    id: reserveroom.id,
                  },
                },
              },
            ],
          },
        });
        if (scheduleDates) {
          return {
            ok: false,
            error: "예약할 수 없는 시간이 있습니다!",
          };
        }
        //class 하나당 스케쥴 하나 생성
      }
      const myreservtion = await client.reservation.create({
        data: {
          roomId: reserveroom.id,
          userId: loggedInUser.id,
          reserveNum: `${Date.now()}${loggedInUser.id}${reserveroom.id}`,
        },
        include: {
          schedule: true,
        },
      });

      for (const time of classes) {
        const myschedules = await client.schedule.create({
          data: {
            year,
            month,
            date,
            userId: loggedInUser.id,
            start: CLASS[time - 1],
            finish: time == CLASS.length ? CLASS[0] : CLASS[time],
            class: String(time),
            reservation: {
              connect: {
                id: myreservtion.id,
              },
            },
            isReserved: true,
            rooms: {
              connect: {
                id: reserveroom.id,
              },
            },
          },
        });
      }
      return {
        ok:true,
        id:myreservtion.id
      };
    }),
  },
};
