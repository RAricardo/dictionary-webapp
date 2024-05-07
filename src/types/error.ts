export class NotFoundError extends Error {
  resolution: string;
  title: string;

  constructor(message: string, resolution: string, title: string) {
    super(message);
    this.name = "NotFoundError";
    this.resolution = resolution;
    this.title = title;
  }
}
