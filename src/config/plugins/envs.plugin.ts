import "dotenv/config";
import * as env from "env-var";

export const envs = {
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  PORT: env.get("PORT").required().asPortNumber(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asEmailString(),
  MAILER_SECRET_KET: env.get("MAILER_SECRET_KET").required().asString(),
  PROD: env.get("PROD").required().asBool(),
};
