import cheerio from "cheerio";
import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { CaptchaRequiredError } from "../error/CaptchaRequiredError";
import { doDeliverooFetch } from "../../../util/doDeliverooFetch";


/**
 * Load up a Deliveroo page and extract the server side rendering goodness
 * If you're an engineer and work at Deliveroo then please don't change this ty <3
 * Or at least message me first.
 */
const getDeliverooContextFromUrl = async (
    url: string
): Promise<DeliverooState> => {
    const html = await doDeliverooFetch(url).then((restaurants) =>
        restaurants.text()
    );

    const $ = cheerio.load(html);

    const data = $("#__NEXT_DATA__");

    if (!data) {
        const html = $("html").html();
        const title = $("title").text();

        if (
            title.indexOf("Cloudflare") > 0 ||
            title.indexOf("Just a moment...") > 0
        ) {
            console.log("Captcha required - sending it back to the user");
            throw new CaptchaRequiredError(String(html));
        }

        throw new Error(`State is null or undefined. State: ${data}`);
    }

    // Get the NEXT state + cookie
    try {
        return JSON.parse(data.html() as string) as DeliverooState;
    } catch (e: any) {
        console.log("Failed to find state", html);
        throw e;
    }
};

export { getDeliverooContextFromUrl };
