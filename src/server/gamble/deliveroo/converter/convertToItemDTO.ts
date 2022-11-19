import { DeliverooItem } from "../../../type/deliveroo/DeliverooItem";
import { convertToImageDTO } from "./convertToImageDTO";
import { convertToPriceDTO } from "./convertToPriceDTO";
import { ItemDTO } from "../../../type/RestaurantDataDTO";

const convertToItemDTO = (deliverooItem: DeliverooItem): ItemDTO => {
    const {
        id,
        categoryId,
        description,
        image,
        name,
        price,
        priceDiscounted,
        modifierGroupIds,
        popular,
    } = deliverooItem;

    return Object.freeze({
        id,
        categoryId,
        description,
        image: image && convertToImageDTO(image),
        name,
        price: convertToPriceDTO(price),
        priceDiscounted: priceDiscounted && convertToPriceDTO(priceDiscounted),
        modifierGroupIds,
        popular,
    });
};

export { convertToItemDTO };
