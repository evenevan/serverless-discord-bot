import { HTTPError } from './HTTPError';

export class AbortError extends HTTPError {
    public constructor({
        message,
        url,
    }: {
        message?: string | undefined,
        url: string,
    }) {
        super({
            message: message,
            url: url,
        });

        this.name = 'AbortError';

        Object.setPrototypeOf(this, AbortError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}