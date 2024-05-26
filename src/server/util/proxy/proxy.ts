import { HttpsProxyAgent } from "https-proxy-agent";
import { validateProxy } from "./validateProxy";

const proxyUrl = process.env.DELIVEROO_PROXY_URL;
let proxy: HttpsProxyAgent<string> | undefined = proxyUrl
    ? new HttpsProxyAgent(proxyUrl)
    : undefined;

if (proxy) {
    console.log(`Starting for first time, proxy is [${proxyUrl}]`)

    validateProxy(proxy)
        .then(() => {
            console.log("Successfully connected to Deliveroo via proxy")
        })
        .catch(() => {
            console.log("Failed to validate proxy, disabling")
            proxy = undefined
        })
} else {
    console.log("No proxy configured")
}

const getProxy = () => proxy

export { getProxy }