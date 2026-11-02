import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.Mongo_DB);

const db = client.db("Bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.Google_Client_ID as string,
      clientSecret: process.env.Google_Client_secret as string,
    },
  },
    github: {
      clientId: process.env.Github_Client_ID as string,
      clientSecret: process.env.Github_Client_secret as string,
    },
});
