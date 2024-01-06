import { LogEntity, LogSeverityLevel } from "./log.entities";

describe("log.entities.test.ts", () => {
  it("should create a LogEntity instance", () => {
    const log = new LogEntity({
      message: "test-message",
      level: LogSeverityLevel.low,
      origin: "log.model.test.ts",
    });

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("test-message");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("log.model.test.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it("should create a LogEntity instance from JSON", () => {
    const log = LogEntity.fromJSON(
      JSON.stringify({
        message: "test-message",
        level: LogSeverityLevel.low,
        origin: "log.model.test.ts",
        createdAt: new Date(),
      })
    );

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("test-message");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("log.model.test.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it("should create a LogEntity instance from object", () => {
    const log = LogEntity.fromObject({
      message: "test-message",
      level: LogSeverityLevel.low,
      origin: "log.model.test.ts",
      createdAt: new Date(),
    });

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("test-message");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("log.model.test.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
