import { envs } from "./envs.plugin";

describe("env.plugin.test.ts", () => {
  it("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: "test@gmail.com",
      MAILER_SECRET_KET: "123456",
      MAILER_SERVICE: "gmail",
      PROD: false,
      MONGO_URL: "mongodb://franger:12345678@localhost:27017/",
      MONGO_DB_NAME: "NOC-test",
      MONGO_USER: "franger",
      MONGO_PASS: "12345678",
    });
  });

  it("should return error if env is not defined", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain(' "PORT" should be a valid integer');
    }
  });
});
