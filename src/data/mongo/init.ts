import mongoose from "mongoose";

interface ConnectionOptions {
  mogoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mogoUrl, dbName } = options;
    try {
      await mongoose.connect(mogoUrl, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName,
      });

      console.log("Mongo connected");
    } catch (error) {
      console.log("Mongo connection error: ");
      throw error;
    }
  }
}
