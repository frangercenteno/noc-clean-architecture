export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJSON(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json);

    if (!message) {
      throw new Error("Invalid log message");
    }

    if (!level) {
      throw new Error("Invalid log level");
    }

    if (!createdAt) {
      throw new Error("Invalid log creation date");
    }

    const log = new LogEntity(level, message);
    log.createdAt = new Date(createdAt);

    return log;
  }
}
