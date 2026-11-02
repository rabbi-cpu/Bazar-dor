import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

const client = new MongoClient(getEnv("Mongo_DB"));

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
      clientId: getEnv("Google_Client_ID"),
      clientSecret: getEnv("Google_Client_secret"),
    },

    github: {
      clientId: getEnv("Github_Client_ID"),
      clientSecret: getEnv("Github_Client_secret"),
    },
  },
});