import { LogEntity, LogSeverityLevel } from "../entities/log.entities";
import { LogDataSource } from "./log.datasource";

describe("log.datasource.test.ts", () => {
  const newLog = new LogEntity({
    message: "test-message",
    level: LogSeverityLevel.low,
    origin: "log.model.test.ts",
  });

  class MockLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }
  it("should test the abstract class", async () => {
    const mockLogDataSource = new MockLogDataSource();
    expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
    expect(typeof mockLogDataSource.saveLog).toBe("function");
    expect(typeof mockLogDataSource.getLogs).toBe("function");

    await mockLogDataSource.saveLog(newLog);
    const logs = await mockLogDataSource.getLogs(LogSeverityLevel.high);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
