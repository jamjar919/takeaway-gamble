// Store a list of URL's we've seen
const placesToEatCollection = new Set<string>([
    "/menu/Oxford/dean-court-and-cumnor/oxford-drinks-and-snacks-delivery",
    "/menu/London/wood-green/mcdonalds-0021-wood-green",
    "/menu/London/upper-holloway/indiebeer" // causing errors
]);

const safeUrlParams = ["category_id"];

// Strip the end of the URL
// eg, /menu/moonlight-balti?geohash=gcpnk3m8gxyf&category_id=123 => /menu/moonlight-balti&category_id=123
const normaliseUrlPath = (url: string) => {
    const [path, params] = url.split("?");

    if (typeof params === "undefined") {
        return path;
    }

    const safeParams = params
        .split("&")
        .filter((param) =>
            safeUrlParams.some((safeParam) => param.startsWith(safeParam))
        );

    if (safeParams.length <= 0) {
        return path;
    }

    return `${path}?${safeParams.join("&")}`;
};

// Compare a given url to see if we've seen it before (and therefore it's safe to visit)
const validatePlaceToEatUrl = (url: string) => {
    return placesToEatCollection.has(normaliseUrlPath(url));
};

const addUrlToCache = (url: string) => {
    placesToEatCollection.add(normaliseUrlPath(url));
};

const getCachedUrls = () => placesToEatCollection;

export {
    addUrlToCache,
    validatePlaceToEatUrl,
    normaliseUrlPath,
    getCachedUrls,
};
