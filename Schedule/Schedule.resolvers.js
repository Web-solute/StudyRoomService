import client from "../client";

export default {
    Schedule:{
        reservation:({id})=> client.reservation.findMany({where:{
            schedule:{
                some:{
                    id
                }
            }
        }})
    }
};
