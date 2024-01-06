import nodemailer from "nodemailer";
import { env } from "process";

import {
  LogEntity,
  LogSeverityLevel,
} from "../../domain/entities/log.entities";

export interface EmailServiceInterface {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: env.MAILER_SERVICE,
    auth: {
      user: env.MAILER_EMAIL,
      pass: env.MAILER_SECRET_KET,
    },
  });

  async sendEmail(options: EmailServiceInterface): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email sent to ${to}`,
        origin: "email.service.ts",
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Email not sent`,
        origin: "email.service.ts",
      });
      return false;
    }
  }

  async sendEmailWithFileSystemLog(
    to: string | string[]
    // subject: string,
    // htmlBody: string,
    // attachments: Attachment[]
  ) {
    const subject = "Server Logs";
    const htmlBody = "<h1>Logos</h1>";
    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
