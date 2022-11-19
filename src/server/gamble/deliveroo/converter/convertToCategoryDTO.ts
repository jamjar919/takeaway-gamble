import { DeliverooCategory } from "../../../type/deliveroo/DeliverooCategory";
import { CategoryDTO } from "../../../type/RestaurantDataDTO";

const convertToCategoryDTO = (category: DeliverooCategory): CategoryDTO => {
    return Object.freeze({
        id: category.id,
        name: category.name,
    });
};

export { convertToCategoryDTO };
