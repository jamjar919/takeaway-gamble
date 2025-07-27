import { Request, Response } from "express";
import { Endpoints } from "../../common/Endpoints";

export const debug = async (_: Request, res: Response) => {
    const restaurantUrl = "/menu/London/wood-green/mcdonalds-0021-wood-green?day=today&geohash=gcpvmqed3nzd&time=ASAP"

    const debugUrls = [
        Endpoints.DEBUG_GAMBLE,
        Endpoints.DEBUG_URL_CACHE,
        `${Endpoints.DEBUG_RESTAURANT}?url=${restaurantUrl}`,
        `${Endpoints.DEBUG_RESTAURANT_CONTEXT}?url=${restaurantUrl}`,
        Endpoints.DEBUG_SEARCH,
        Endpoints.DEBUG_SEARCH_CONTEXT
    ]

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <title>Debug</title>
            <body>
                <h1>Debug</h1>
                <ul>
                    ${debugUrls.map(url => `<li><a href="${url}">${url}</a></li>`).join('')}
                </ul>
            </body>
        </html>
    `)
};
