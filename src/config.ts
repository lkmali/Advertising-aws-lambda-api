import { Env } from "./interface"
import { Algorithm } from "jsonwebtoken"

console.log("envConfig", process.env)
const envConfig: Env = {
  JWT_STRATEGY_NAME: "jwtAuth",
  BASIC_STRATEGY_NAME: "basicAuth",
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["*"],
  MONGO_DB_URL:
    process.env.MONGO_DB_URL ??
    "mongodb+srv://laxman:9lsaIEOt2Ilw6gVt@cluster0.og0el.mongodb.net/sync-ai?retryWrites=true&w=majority&appName=Cluster0",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? "mysecret",
  JWT_ISSUER: process.env.JWT_ISSUER ?? "mysecret",
  PASSWORD_ROUNDS: Number(process.env.PASSWORD_ROUNDS ?? 10),
  JWT_ALGO: (process.env.JWT_ALGO ?? "HS256") as Algorithm,
  IS_LOCAL_APP: String(process.env.IS_LOCAL_APP) === "true",
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN ?? 3600) ?? "1h",
  NETWORK_WEBHOOK_SECRET: process.env.NETWORK_WEBHOOK_SECRET ?? "mysecret",
}

console.log("envConfig", envConfig)

export { envConfig }
