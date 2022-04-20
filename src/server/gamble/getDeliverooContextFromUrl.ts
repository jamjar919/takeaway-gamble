import fetch, {RequestInit, Response} from "node-fetch";
import cheerio from "cheerio";
import {DeliverooState} from "../type/deliveroo/DeliverooState";
import {createCookie} from "../util/createCookie";
import {parseCookie} from "../util/parseCookie";
import {CaptchaRequiredError} from "./error/CaptchaRequiredError";

const BASE_URL = "https://deliveroo.co.uk";

let currentCookie: Record<string, string> = {};

const getOptions = (): RequestInit => ({
    headers: {
        cookie: createCookie(currentCookie),
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
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
})

const MAX_TRIES = 2;

const doFetch = (url: string, attemptNumber = 0): Promise<Response> => {
    return fetch(BASE_URL + url, getOptions())
        .then((res: Response) => {
            const newCookie = parseCookie(res.headers.get('set-cookie') || '');

            currentCookie = {
                ...currentCookie,
                ...newCookie
            };

            if (res.status === 301) {
                if (attemptNumber > MAX_TRIES) {
                    throw new Error("Maximum retries exceeded")
                }

                // Retry (having updated cookie)
                return doFetch(url, attemptNumber + 1)
            }

            return res;
        })
}

const getDeliverooContextFromUrl = async (
    url: string,
): Promise<DeliverooState> => {
    const html = await doFetch(url)
        .then(restaurants => restaurants.text());

    const $ = cheerio.load(html);

    const data = $('#__NEXT_DATA__')

    if (data.length <= 1) {
        const html = $("html").html();

        if ($("title").text().indexOf("Cloudflare") > 0) {
            console.log("Captcha required - sending it back to the user")
            throw new CaptchaRequiredError(String(html));
        }

        console.log(html);
        throw new Error(`State is null or undefined. State: ${data}`)
    }

    // Get the NEXT state + cookie
    return JSON.parse(data.html() as string) as DeliverooState;
};

export { getDeliverooContextFromUrl };