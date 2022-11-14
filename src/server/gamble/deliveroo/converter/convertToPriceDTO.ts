import { DeliverooPrice } from "../../../type/deliveroo/DeliverooPrice";
import { PriceDTO } from "../../../type/RestaurantDataDTO";

const convertToPriceDTO = (deliverooPrice: DeliverooPrice): PriceDTO => {
    return {
        ...deliverooPrice,
    };
};

export { convertToPriceDTO };
