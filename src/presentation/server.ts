import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/emial.service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started", envs.MAILER_EMAIL);
    // new SendEmailLogs(fileSystemLogRepository, emailService).execute(
    //   "fcenteno2045@gmail.com"
    // );
    // CronService.createJob(
    //   "*/5 * * * * *",
    //   () =>
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log("Success"),
    //       (error) => console.error(error)
    //     ).execute("https://www.google.com")
    //   // new CheckService().execute("http://localhost:3004");
    // );
  }
}
