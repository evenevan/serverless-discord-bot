import { AbortError } from '../errors/AbortError';
import { HTTPError } from '../errors/HTTPError';
import {
    restRequestTimeout,
    retryLimit,
} from '../utility/Constants';

export class Request {
    public readonly restRequestTimeout: number;

    public retry: number;

    public readonly retryLimit: number;

    constructor() {
        this.restRequestTimeout = restRequestTimeout;

        this.retry = 0;

        this.retryLimit = retryLimit;
    }

    public async request(url: string, fetchOptions?: RequestInit): Promise<Response> {
        const controller = new AbortController();
        const abortTimeout = setTimeout(
            () => {
                console.warn(
                    `${this.constructor.name}:`,
                    'Cancelling a request due to the abort timeout.',
                );

                controller.abort();
            },
            this.restRequestTimeout,
        );

        try {
            const response = await fetch(url, {
                signal: controller.signal,
                ...fetchOptions,
            });

            if (response.ok === true) {
                return response;
            }

            if (
                this.retry < this.retryLimit
                && response.status >= 500
                && response.status < 600
            ) {
                console.warn(
                    `${this.constructor.name}:`,
                    'Retrying due to a response between 500 and 600.',
                    `Status: ${response.status}.`,
                );

                this.retry += 1;

                return await this.request(url, fetchOptions);
            }

            const error = new HTTPError({
                response: response,
                url: url,
            });

            console.error(error);

            throw error;
        } catch (error) {
            if (this.retry < this.retryLimit) {
                console.warn(
                    `${this.constructor.name}:`,
                    'Retrying due to an AbortError.',
                );

                this.retry += 1;

                return await this.request(url, fetchOptions);
            }

            throw new AbortError({
                message: (error as Error)?.message,
                url: url,
            });
        } finally {
            clearTimeout(abortTimeout);
        }
    }
}