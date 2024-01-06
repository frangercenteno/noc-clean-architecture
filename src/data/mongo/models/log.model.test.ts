import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe("log.model.test.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("should return logModel", async () => {
    const logData = {
      message: "test-message",
      level: "low",
      origin: "log.model.test.ts",
    };

    const log = await LogModel.create(logData);
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        createdAt: expect.any(Date),
        id: expect.any(String),
      })
    );
  });

  it("should return the schema object", () => {
    expect(LogModel.schema.obj).toEqual(
      expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        origin: { type: expect.any(Function) },
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          default: "low",
        },
        createdAt: expect.any(Object),
      })
    );
  });
});
