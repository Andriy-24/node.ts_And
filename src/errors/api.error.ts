export class ApiError extends Error {
  public status: number;
  constructor(messsage: string, status: number) {
    super(messsage);
    this.status = status;
  }
}
