require("dotenv").config();
import express from "express";
import logger from "morgan";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./User/User.utils";
import cors from "cors";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground:true,
  introspection:true,
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

httpServer.listen(PORT,()=>{
  console.log(`Server is running on http://localhost:${PORT}/graphql`)
});
