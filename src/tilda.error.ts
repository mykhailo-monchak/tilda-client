export class TildaError extends Error {
  constructor(public readonly status: string, message: string) {
    super(message);
  }
}

// Thrown instead of the underlying fetch implementation's own JSON-parse error, which
// discards the response body before rejecting - making it impossible to tell what the
// API actually returned (e.g. an HTML error/maintenance page served with a 200 status).
export class TildaInvalidResponseError extends Error {
  constructor(public readonly httpStatus: number, public readonly url: string, public readonly body: string) {
    super(`Invalid JSON response from Tilda API (HTTP ${httpStatus}) at ${url}: ${body}`);
  }
}

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new TildaInvalidResponseError(response.status, response.url, text.slice(0, 500));
  }
}

export async function throwTildaError(response: Response): Promise<never> {
  const tildaError = await parseJsonResponse<{ status: string; message: string; errorside: string }>(response);
  throw new TildaError(tildaError.status, tildaError.message);
}
