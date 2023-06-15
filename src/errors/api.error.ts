export class ApiError extends Error {
  public status;
  constructor(messsage: string, status: number) {
    super(messsage);
    this.status = status;
  }
}
