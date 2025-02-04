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

    const title = getHtmlTagContentsFromString(html, "title");
    if (title && title.includes("Cloudflare")) {
        console.log("Captcha required - sending it back to the user");
        throw new CaptchaRequiredError(String(html));
    }

    // Get the NEXT state + cookie
    try {
        const nextData = getHtmlTagContentsFromString(html, 'script', `id="__NEXT_DATA__"`);

        if (nextData === null) {
            throw new Error("NEXT_DATA tag not present")
        }

        return JSON.parse(nextData) as DeliverooState;
    } catch (e: any) {
        console.log("Failed to find state", html);
        throw e;
    }
};

/**
 * Retrieve the content of a tag from a string of HTML
 *
 * Eg, HTML = <hello>content</hello>
 *     tag = hello
 *          => "content"
 *     HTML = <script id="something">content</script>,
 *     tag = script
 *     attributes = id="something"
 *          => "content"
 *
 * This is a bit silly but so was pulling in an entire HTML parser to get the content of one tag
 */
const getHtmlTagContentsFromString = (html: string, tag: string, attributes: string = ''): string | null => {
    const tagPattern = new RegExp(`<${tag}[^>]*${attributes}[^>]*>(.*?)</${tag}>`, 'gi');

    const match = tagPattern.exec(html);
    if (match !== null) {
        return match[1];
    }

    return null;
}

export { getDeliverooContextFromUrl };
