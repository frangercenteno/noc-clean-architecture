import { LogEntity } from "../../entities/log.entities";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe("SendEmailLogs", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLog: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call sendEmail and saveLog", async () => {
    const result = await sendEmailLogs.execute("test@gmail.com");
    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Email sent to test@gmail.com",
      origin: "email.service.ts",
    });
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemLog.mockResolvedValue(false);

    const result = await sendEmailLogs.execute("test@gmail.com");

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLog).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Email not sent",
      origin: "email.service.ts",
    });
  });
});
