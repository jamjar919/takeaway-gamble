import { SelectedModifierDTO } from "../../type/RestaurantDataDTO";
import { SelectedModifierWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";
import { convertToModifierGroupWebModel } from "./convertToModifierGroupWebModel";
import { convertToModifierOptionWebModel } from "./convertToModifierOptionWebModel";

const convertToSelectedModifierWebModel = (
    selectedModifier: SelectedModifierDTO
): SelectedModifierWebModel => {
    return {
        group: convertToModifierGroupWebModel(selectedModifier.group),
        options: selectedModifier.options.map(convertToModifierOptionWebModel),
    };
};

export { convertToSelectedModifierWebModel };
