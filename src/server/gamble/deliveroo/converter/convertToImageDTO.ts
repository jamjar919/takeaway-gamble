import { DeliverooItemImage } from "../../../type/deliveroo/DeliverooItem";
import { ItemImageDTO } from "../../../type/RestaurantDataDTO";

const convertToImageDTO = (image: DeliverooItemImage): ItemImageDTO => {
    return {
        ...image,
    };
};

export { convertToImageDTO };
