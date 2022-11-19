import { DeliverooPrice } from "../../../type/deliveroo/DeliverooPrice";
import { PriceDTO } from "../../../type/RestaurantDataDTO";

const convertToPriceDTO = (deliverooPrice: DeliverooPrice): PriceDTO => {
    return Object.freeze({
        ...deliverooPrice,
    });
};

export { convertToPriceDTO };
