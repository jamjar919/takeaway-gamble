// Store a list of URL's we've seen
const placesToEatCollection = new Set<string>()

// Strip the end of the URL (eg, /menu/oxford/old-headington/moonlight-balti?geohash=gcpnk3m8gxyf => /menu/oxford/old-headington/moonlight-balti)
const normaliseUrlPath = (url: string) => {
    return url.split('?')[0];
}

// Compare a given url to see if we've seen it before (and therefore it's safe to visit)
const validatePlaceToEatUrl = (url: string) => {
    console.log(placesToEatCollection);

    return placesToEatCollection.has(normaliseUrlPath(url));
}

const addUrlToCache = (url: string) => {
    placesToEatCollection.add(normaliseUrlPath(url));
}

export { addUrlToCache, validatePlaceToEatUrl, normaliseUrlPath }