import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasorce";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entities";

export class MongoLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log("Mongo Log created", newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });
    return logs.map((log) => LogEntity.fromObject(log));
  }
}
