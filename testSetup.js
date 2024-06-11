import * as matchers from 'jest-extended';

expect.extend(matchers);

// custom matchers
expect.extend({
    toHaveBeenCalledOnceWith: matchers.toHaveBeenCalledExactlyOnceWith
});