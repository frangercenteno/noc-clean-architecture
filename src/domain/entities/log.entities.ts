export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJSON(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json);

    if (!message) {
      throw new Error("Invalid log message");
    }

    if (!level) {
      throw new Error("Invalid log level");
    }

    if (!createdAt) {
      throw new Error("Invalid log creation date");
    }

    const log = new LogEntity({ message, level, createdAt, origin });

    return log;
  }
}
