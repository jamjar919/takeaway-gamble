import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";

/**
 * Validate a proxy works, and throw if it does not.
 */
const validateProxy = (proxy: HttpsProxyAgent<string>): Promise<void> => {
    return fetch("https://deliveroo.co.uk", { agent: proxy })
        .then((r) => {
            if (r.ok) {
                return;
            }

            throw new Error("Error connecting to proxy")
        })
}

export { validateProxy }