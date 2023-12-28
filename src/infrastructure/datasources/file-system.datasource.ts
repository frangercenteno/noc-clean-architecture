import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasorce";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entities";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = "logs/";
  private readonly allLogsPath: string = "logs/logs-all.log";
  private readonly mediumLogsPath: string = "logs/logs-medium.log";
  private readonly highLogsPath: string = "logs/logs-high.log";

  constructor() {
    this.createLogFiles();
  }

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, "");
        }
      }
    );
  };

  private getLogsFromFile = (path: string): LogEntity[] => {
    const fileContent = fs.readFileSync(path, "utf8");
    const logs = fileContent
      .split("\n")
      .filter((log) => log !== "")
      .map((log) => LogEntity.fromJSON(log));

    return logs;
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const jsonLog = JSON.stringify(newLog);
    fs.appendFileSync(this.allLogsPath, `${jsonLog}\n`);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, `${jsonLog}\n`);
    } else {
      fs.appendFileSync(this.highLogsPath, `${jsonLog}\n`);
    }
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error(`${severityLevel} is not a valid severity level`);
    }
  }
}
