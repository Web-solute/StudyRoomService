import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Mutation: {
    deleteReservation: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        if (!loggedInUser.isValid) {
          return {
            ok: false,
            error: "로그인 후 이용해주세요",
          };
        }
        const reservation = await client.reservation.findFirst({
          where: {
            AND: [{ id }, { userId: loggedInUser.id }],
          },
        });
        if (!reservation) {
          return {
            ok: false,
            error: "예약 없음!",
          };
        }
        await client.reservation.delete({ where: { id: reservation.id } });
        return {
          ok: true,
        };
      }
    ),
  },
};
