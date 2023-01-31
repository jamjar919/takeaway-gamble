import { Cuisine } from "./Cuisine";

enum GambleMethod {
    /** Gamble based on a postcode */
    POSTCODE = "POSTCODE",
    /** Regamble based on a previously used URL */
    URL = "URL",
}

type BaseGambleRequest = {
    priceLimit: number;
    numberOfPeople?: number;
};

type PostcodeGambleRequest = BaseGambleRequest & {
    method: GambleMethod.POSTCODE;
    postcode: string;
    cuisine?: Cuisine
};

type UrlGambleRequest = BaseGambleRequest & {
    method: GambleMethod.URL;
    url: string;
};

type GambleRequest = PostcodeGambleRequest | UrlGambleRequest;

export { GambleMethod, GambleRequest, PostcodeGambleRequest, UrlGambleRequest };
