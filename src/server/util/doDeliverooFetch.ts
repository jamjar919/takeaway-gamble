import { parseCookie } from "./parseCookie";
import { createCookie } from "./createCookie";
import { getProxy } from "./proxy/proxy";

let currentCookie: Record<string, string> = {};

const MAX_TRIES = 2;

const BASE_URL = "https://deliveroo.co.uk";

const getOptions = (): RequestInit => ({
    headers: {
        cookie: createCookie(currentCookie),
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    redirect: "manual",
    agent: getProxy()
});

const doDeliverooFetch = (
    url: string,
    attemptNumber = 0
): Promise<Response> => {
    const options = getOptions();

    console.log(`fetching [Proxy ${options?.agent ? "YES" : "NO"}] ${url}`);

    return fetch(BASE_URL + url, options).then((res: Response) => {
        const newCookie = parseCookie(res.headers.get("set-cookie") || "");

        currentCookie = {
            ...currentCookie,
            ...newCookie,
        };

        if (res.status === 301) {
            if (attemptNumber > MAX_TRIES) {
                throw new Error("Maximum retries exceeded");
            }

            // Retry (having updated cookie)
            return doDeliverooFetch(url, attemptNumber + 1);
        }

        return res;
    });
};

export { doDeliverooFetch };
