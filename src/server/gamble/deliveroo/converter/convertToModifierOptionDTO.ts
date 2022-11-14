import { DeliverooModifierOption } from "../../../type/deliveroo/DeliverooModifierOption";
import { convertToPriceDTO } from "./convertToPriceDTO";
import { ModifierOptionDTO } from "../../../type/RestaurantDataDTO";

const convertToModifierOptionDTO = (
    option: DeliverooModifierOption
): ModifierOptionDTO => {
    const { id, name, description, price, priceDiscounted, available } = option;

    return {
        id,
        name,
        description,
        price: convertToPriceDTO(price),
        priceDiscounted: priceDiscounted && convertToPriceDTO(priceDiscounted),
        available,
    };
};

export { convertToModifierOptionDTO };
