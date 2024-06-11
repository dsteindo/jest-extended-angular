
declare namespace jest {
    // noinspection JSUnusedGlobalSymbols
    interface Matchers<R> {
        /**
         * Use `.toHaveBeenCalledOnceWith` to check if a `Mock` was called exactly one time with the expected value.
         */
        toHaveBeenCalledOnceWith(...args: unknown[]): R;
    }
}