import client from "../client";

export default {
    Room:{
        schedules:()=> client.schedule.findMany({
            where:{
                rooms:{
                    some:{
                        id
                    }
                }
            }
        })
    },
};
