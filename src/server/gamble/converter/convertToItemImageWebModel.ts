import { ItemImageWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";
import { ItemImageDTO } from "../../type/RestaurantDataDTO";

const convertToItemImageWebModel = (
    itemImage: ItemImageDTO
): ItemImageWebModel => {
    return Object.freeze({
        ...itemImage,
    });
};

export { convertToItemImageWebModel };
