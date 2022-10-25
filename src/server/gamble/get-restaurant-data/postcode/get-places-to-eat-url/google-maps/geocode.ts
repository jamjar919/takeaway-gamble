import fetch from "node-fetch";
import dotenv from "dotenv";
import {Cache} from "../../../../../util/cache";

dotenv.config();

const geocodeCache: Cache<google.maps.GeocoderResult | null> = new Cache();

const getEndpoint = (address: string) => {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=uk&key=${process.env.GOOGLE_API_KEY}`
}

/**
 * Geocode a supplied address with the Google Maps API
 * @param address    Address string to geocode
 */
const geocode = async (address: string): Promise<null | google.maps.GeocoderResult>  => {
    return geocodeCache.getAsync(address, async () => {
        const endpoint = getEndpoint(address);

        const response = await fetch(endpoint)
            .then((response) => response.json() as Promise<google.maps.GeocoderResponse>);

        if (response.results.length == 0) {
            return null;
        }

        return response.results[0];
    })
}

export { geocode }