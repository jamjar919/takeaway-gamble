import { ModifierGroupDTO } from "../../type/RestaurantDataDTO";
import { ModifierGroupWebModel } from "../../../common/type/SelectedRestaurantAndItemsWebModel";

const convertToModifierGroupWebModel = (
    group: ModifierGroupDTO
): ModifierGroupWebModel => {
    const { id, name, description, minSelection, maxSelection, repeatable } =
        group;

    return {
        id,
        name,
        description,
        minSelection,
        maxSelection,
        repeatable,
    };
};

export { convertToModifierGroupWebModel };
