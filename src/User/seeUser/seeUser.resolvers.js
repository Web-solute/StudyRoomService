import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Query: {
        seeUser: protectedResolver(
            async (_,{studentId},{loggedInUser}) => {
                if(!loggedInUser.id){
                    return null;
                }
                return client.user.findUnique({where:{studentId}});
            }
        ) 
    }
};