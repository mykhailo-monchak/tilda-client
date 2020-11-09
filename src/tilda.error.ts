export class TildaError extends Error {
  constructor(public readonly status: string, message: string) {
    super(message);
  }
}

export async function throwTildaError(response: Response): Promise<void> {
  const tildaError: { status: string; message: string; errorside: string } = await response.json();
  throw new TildaError(tildaError.status, tildaError.message);
}
