export class TildaError<T> extends Error {
  constructor(public readonly response: Response) {
    super(`Tilda API responded: ${response.statusText}`);
  }
}
