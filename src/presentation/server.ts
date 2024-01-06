import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/emial.service";

// const logRepository = new LogRepositoryImpl(
//   // new FileSystemDataSource()
//   // new MongoLogDataSource()
//   new PostgresLogDataSource()
// );

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started");
    // new SendEmailLogs(fileSystemLogRepository, emailService).execute(
    //   "fcenteno2045@gmail.com"
    // );

    CronService.createJob(
      "*/5 * * * * *",
      () =>
        // new CheckService(
        //   logRepository,
        //   () => console.log("Success"),
        //   (error) => console.error(error)
        // ).execute("https://www.google.com")
        new CheckServiceMultiple(
          [fsLogRepository, mongoLogRepository, postgresLogRepository],
          () => console.log("Success"),
          (error) => console.error(error)
        ).execute("https://www.google.com")
      //   // new CheckService().execute("http://localhost:3004");
    );
  }
}
