import { LogEntity, LogSeverityLevel } from "../../entities/log.entities";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string | Error) => void) | undefined;
const origin = "check-service.ts";
export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on check service: ${url}`);
      }
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} is working`,
        origin,
      });
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const erroMessage = `Error on check service ${url}: ${error}`;
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: erroMessage,
        origin,
      });
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(`${error}`);
      return false;
    }
  }
}
