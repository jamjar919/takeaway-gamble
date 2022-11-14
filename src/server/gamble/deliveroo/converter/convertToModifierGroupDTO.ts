import { DeliverooModifierGroup } from "../../../type/deliveroo/DeliverooModifierGroup";
import { convertToModifierOptionDTO } from "./convertToModifierOptionDTO";
import { ModifierGroupDTO } from "../../../type/RestaurantDataDTO";

const convertToModifierGroupDTO = (
    deliverooModifierGroup: DeliverooModifierGroup
): ModifierGroupDTO => {
    const {
        id,
        name,
        description,
        minSelection,
        maxSelection,
        repeatable,
        modifierOptions,
    } = deliverooModifierGroup;

    return {
        id,
        name,
        description,
        minSelection,
        maxSelection,
        repeatable,
        modifierOptions: modifierOptions.map(convertToModifierOptionDTO),
    };
};

export { convertToModifierGroupDTO };
