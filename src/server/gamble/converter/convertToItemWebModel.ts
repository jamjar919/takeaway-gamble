import { ItemDTO } from "../../type/RestaurantDataDTO";
import { ItemWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";
import { convertToPriceWebModel } from "./convertToPriceWebModel";
import { convertToItemImageWebModel } from "./convertToItemImageWebModel";

const convertToItemWebModel = (item: ItemDTO): ItemWebModel => {
    const {
        id,
        categoryId,
        description,
        image,
        name,
        price,
        priceDiscounted,
        popular,
    } = item;

    return {
        id,
        categoryId,
        description,
        image: image && convertToItemImageWebModel(image),
        name,
        price: convertToPriceWebModel(price),
        priceDiscounted:
            priceDiscounted && convertToPriceWebModel(priceDiscounted),
        popular,
    };
};

export { convertToItemWebModel };
