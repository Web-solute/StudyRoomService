import client from "../client";

export default {
    Reservation:{
        user:({userId}) => client.user.findUnique({where:{id:userId}}),
        group:({id}) => client.user.findMany({
            where:{
                member:{
                    some:{
                        id
                    }
                }
            }
        }),
        room:({roomId}) => client.room.findUnique({where:{id:roomId}}),
    },
    Room:{
        classes:({id})=> client.room.findUnique({where:{id}}).classes(),
        reservation:({id})=>client.room.findUnique({id}).reservation()
    },
    Class:{
        room:({roomId}) => client.room.findUnique({where:{id:roomId}})
    }
};
