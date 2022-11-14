import { ItemImageWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";
import { ItemImageDTO } from "../../type/RestaurantDataDTO";

const convertToItemImageWebModel = (
    itemImage: ItemImageDTO
): ItemImageWebModel => {
    return {
        ...itemImage,
    };
};

export { convertToItemImageWebModel };
