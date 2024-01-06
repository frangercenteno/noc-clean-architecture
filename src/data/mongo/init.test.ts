import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("init MongoDb", () => {
  afterAll(() => {
    mongoose.connection.close();
  });

  it("should connect to MongoDB", async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });

    expect(connected).toBeTruthy();
  });

  it("should throw error if connection failed", async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: "mongodb://localhost:27017/",
        dbName: "NOC-test",
      });
      expect(true).toBe(false);
    } catch (error) {}
  });
});
