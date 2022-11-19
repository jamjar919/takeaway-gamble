import { PriceDTO } from "../../type/RestaurantDataDTO";
import { PriceWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";

const convertToPriceWebModel = (price: PriceDTO): PriceWebModel => {
    return Object.freeze({
        ...price,
    });
};

export { convertToPriceWebModel };
