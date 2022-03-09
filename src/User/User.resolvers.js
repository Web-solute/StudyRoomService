import client from "../client";

export default {
    User:{
        reservations: ({id}) => client.user.findUnique({where:{id}}).reservations(),
        member: ({id}) => client.reservation.findMany({
            where:{
                group:{
                    some:{
                        id
                    }
                }
            }
        })
    }
}