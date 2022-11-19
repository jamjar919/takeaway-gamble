import { SelectedItemDTO } from "../../type/RestaurantDataDTO";
import { SelectedItemWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";
import { convertToItemWebModel } from "./convertToItemWebModel";
import { convertToSelectedModifierWebModel } from "./convertToSelectedModifierWebModel";

const convertToSelectedItemWebModel = (
    selectedItem: SelectedItemDTO
): SelectedItemWebModel => {
    return Object.freeze({
        item: convertToItemWebModel(selectedItem.item),
        modifiers: selectedItem.modifiers.map(
            convertToSelectedModifierWebModel
        ),
    });
};

export { convertToSelectedItemWebModel };
