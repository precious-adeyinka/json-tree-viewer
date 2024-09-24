// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: any): boolean => {
    return value && typeof value === 'object' && !Array.isArray(value);
};
