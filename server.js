require("dotenv").config();
import express from "express";
import logger from "morgan";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./User/User.utils";
import cors from "cors";
import cron from "node-cron";
import pubsub from "./pubsub";
import { ROOM_UPDATED } from "./constant";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if(ctx.req){
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    }
    else {
      const {
        connection:{context}
      } = ctx;
      return {
        loggedInUser:context.loggedInUser
      }
    }
  },
  subscriptions:{
    onConnect: async({token}) => {
      if(!token){
        throw new Error("You can't Listen")
      }
      const loggedInUser = await getUser(token);
      return {
        loggedInUser
      }
    }
  }
});

const app = express();
app.use(cors());
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

cron.schedule('* * * * * *',function(){
  pubsub.publish(ROOM_UPDATED,{roomUpdates:"OK"})
});

httpServer.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}/graphql`)
});
