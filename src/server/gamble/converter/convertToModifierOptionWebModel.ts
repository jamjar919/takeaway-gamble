import { ModifierOptionDTO } from "../../type/RestaurantDataDTO";
import { ModifierOptionWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";
import { convertToPriceWebModel } from "./convertToPriceWebModel";

const convertToModifierOptionWebModel = (
    option: ModifierOptionDTO
): ModifierOptionWebModel => {
    const { id, name, description, price, priceDiscounted, available } = option;

    return Object.freeze({
        id,
        name,
        description,
        price: convertToPriceWebModel(price),
        priceDiscounted:
            priceDiscounted && convertToPriceWebModel(priceDiscounted),
        available,
    });
};

export { convertToModifierOptionWebModel };
