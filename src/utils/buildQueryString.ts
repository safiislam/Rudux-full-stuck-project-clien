/* eslint-disable @typescript-eslint/no-explicit-any */
const buildQueryString = (obj: Record<string, any>, prefix: string = ''): string => {
    const queryString = Object.keys(obj).map(key => {
        const value = obj[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return Object.keys(value).map(subKey => {
                const subValue = value[subKey];
                return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(subKey)}=${encodeURIComponent(String(subValue))}`;
            }).join('&');
        } else {
            return `${encodeURIComponent(prefixedKey)}=${encodeURIComponent(String(value))}`;
        }
    }).join('&');

    return queryString;
};
export default buildQueryString