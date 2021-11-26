export class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  public toJSON() {
    return {
      timestamp: Date.now(),
      status: this.status,
      message: this.message,
    };
  }
}
