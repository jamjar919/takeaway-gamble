import {GambleMethod, GambleRequest} from "../../common/type/GambleRequest";
import {parse as parsePostcode} from "postcode";

const GAMBLE_MAX = 1000_00;

const validatePresent = <T>(
    object: {[key: string]: T | undefined | null},
    key: string
) => {
    const value = object[key];
    if (typeof value === "undefined" || value === null) {
        throw new Error(`Expected ${key} to be defined and not null`);
    }
}

function validateGambleRequest(requestBody: any): asserts requestBody is GambleRequest {
    validatePresent<string>(requestBody, "method");
    validatePresent<string>(requestBody, "priceLimit");
    validatePresent<string>(requestBody, "firstItemIsLarge");

    if (requestBody.priceLimit > GAMBLE_MAX) {
        throw new Error("Max price is £1000");
    }

    switch (requestBody.method) {
        // For postcode, validate postcode presence + validity
        case GambleMethod.POSTCODE:
            validatePresent<string>(requestBody, "postcode");

            const postcode = parsePostcode(requestBody.postcode)
            if (!postcode.valid) {
                throw new Error("Please enter a valid postcode");
            }
            break;
        // For URL, just validate it's there. We check later that it's a valid deliveroo api
        case GambleMethod.URL:
            validatePresent<string>(requestBody, "url");
            break;
        default:
            throw new Error("Unsupported gamble method")
    }
}


export { validateGambleRequest }