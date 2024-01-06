import { EmailService } from "../../../presentation/email/emial.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entities";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLog(to);
      if (!sent) {
        throw new Error("Email not sent");
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email sent to ${to}`,
        origin: "email.service.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Email not sent`,
        origin: "email.service.ts",
      });

      this.logRepository.saveLog(log);
      return false;
    }
  }
}
