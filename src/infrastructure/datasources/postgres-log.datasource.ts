import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entities";

const prismaClient = new PrismaClient();

const SeverityLevelMap = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const { message, level, origin, createdAt } = log;
    await prismaClient.logModel.create({
      data: {
        message: message,
        level: SeverityLevelMap[level],
        origin,
        createdAt,
      },
    });

    console.log("Log saved");
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: SeverityLevelMap[severityLevel],
      },
    });
    return logs.map((log) => LogEntity.fromObject(log));
  }
}
