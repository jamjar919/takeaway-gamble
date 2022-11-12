const TECHNICAL_HEADERS = ["path", "samesite", "expires", "domain"];

// Parse a cookie (hello=value; foo=bar) to an object
const parseCookie = (cookie: string): Record<string, string> => {
    const result: Record<string, string> = {};

    cookie
        .split(";")
        .flatMap((arr) => arr.split(","))
        .map((v) => v.split("="))
        .filter((pair) => pair.length === 2)
        .filter(
            (pair) => !TECHNICAL_HEADERS.includes(pair[0].trim().toLowerCase())
        )
        .forEach(([key, value]) => {
            result[decodeURIComponent(key.trim())] = decodeURIComponent(
                value.trim()
            );
        });

    return result;
};

export { parseCookie };
