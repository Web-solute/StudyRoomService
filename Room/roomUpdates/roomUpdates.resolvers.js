import { ROOM_UPDATED } from "../../constant";
import pubsub from "../../pubsub";

export default {
    Subscription:{
        roomUpdates:{
            subscribe: () => pubsub.asyncIterator(ROOM_UPDATED)
            //listening trigger String으로 설정
        }
    }
}