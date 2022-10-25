import {geocode} from "./google-maps/geocode";
import fetch, {RequestInit} from "node-fetch";
import {normaliseUrlPath} from "../../../deliveroo-state-selectors/getPlacesToEatFromDeliverooState";

type DeliverooRestaurantApiResponse = {
    coordinates: [number, number],
    url: string
};

const callDeliverooApi = async (location: google.maps.GeocoderResult): Promise<DeliverooRestaurantApiResponse> => {
    const options: RequestInit = {
        headers: {
            "content-type": "application/json",
            "origin": "https://deliveroo.co.uk",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        method: "POST",
        redirect: "follow",
        body: JSON.stringify({
            "fulfillment_method": "DELIVERY",
            "location": {
                "coordinates": [
                    location.geometry.location.lng,
                    location.geometry.location.lat
                ]
            }
        })
    };

    return fetch("https://deliveroo.co.uk/api/restaurants", options)
        .then(response => response.json() as Promise<DeliverooRestaurantApiResponse>)
}

/**
 * Return the Deliveroo URL stub for a given address or postcode
 * eg: /restaurants/oxford/south-cowley?fulfillment_method=DELIVERY&geohash=gcpnk1jt469h
 */
const getPlacesToEatUrl = async (postcode: string): Promise<string | null> => {
    const geocodedLocation = await geocode(postcode);

    if (geocodedLocation === null) {
        return null;
    }

    const response = await callDeliverooApi(geocodedLocation)

    if (response.url) {
        return normaliseUrlPath(response.url);
    }

    return null;
}

export { getPlacesToEatUrl }