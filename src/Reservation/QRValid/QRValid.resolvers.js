import client from "../../client";
import { protectedResolver } from "../../User/User.utils";

export default {
  Query: {
    QRValid: protectedResolver(async (_, __, { loggedInUser }) => {
      const TODAY = new Date();
      const year = String(TODAY.getFullYear());
      const month = String(TODAY.getMonth() + 1);
      // (TODAY.getMonth()+1 >= 10 ? TODAY.getMonth()+1 : `0${TODAY.getMonth()+1}`);
      const date = String(TODAY.getDate());
      const hours = ('0' + TODAY.getHours()).slice(-2); 
      const minutes = ('0' + TODAY.getMinutes()).slice(-2);
      const timeString = hours+":"+minutes;

      const schedule = await client.schedule.findMany({
        where:{
          userId:loggedInUser.id,
          year,
          month,
          date
        }
      });
      const verified = schedule.filter((s)=>{
        const startObj = s.start.split(":");
        const finishObj = s.finish.split(":");
        const timeStringObj = timeString.split(":"); 
        if( Number(startObj[0]) < Number(timeStringObj[0]) ){
          if(Number(finishObj[0]) <= Number(timeStringObj[0])){
            return s;
          }
        }
        else if( Number(startObj[0]) === Number(timeStringObj[0]) ){
          if(Number(startObj[1]) <= Number(timeStringObj[1])){
            if(Number(finishObj[1]) >= Number(timeStringObj[1])){
              return s;
            }
          }
        }
      })

      if(verified.length > 0){
        const validQR = await client.qRModel.findMany({where:{activate:false}});
        const QRLen = validQR.length;
        const randomNum = Math.floor(Math.random() * QRLen +1);
        const QR = validQR[randomNum];
        
        return QR;
      }
      else {
        return null;
      }
    }),
  },
};
