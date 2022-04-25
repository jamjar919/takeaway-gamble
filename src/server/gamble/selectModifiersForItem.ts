import {DeliverooItem} from "../type/deliveroo/DeliverooItem";
import {DeliverooModifierGroup} from "../type/deliveroo/DeliverooModifierGroup";
import {SelectedModifier} from "../../common/type/SelectedRestaurantAndItems";
import {DeliverooModifierOption} from "../type/deliveroo/DeliverooModifierOption";
import {pickOneFromArray} from "../../common/util/pickOneFromArray";

const MODIFIER_SELECT_PROBABILITY = 0.5;

const selectModifiersForItem = (
    item: DeliverooItem,
    modifiers: DeliverooModifierGroup[],
): SelectedModifier[] => {
    const validModifierGroupsForItem = modifiers
        .filter(group => item.modifierGroupIds.includes(group.id));

    return validModifierGroupsForItem
        .map((group) => {
            const options: DeliverooModifierOption[] = [];

            const validOptions = group.modifierOptions.filter((option) => option.available);

            // Select any required options
            while (options.length <= group.minSelection) {
                options.push(pickOneFromArray(validOptions));
            }

            // Optionally select any up to the maximum options
            if (group.repeatable) {
                // Chance of selecting multiple options based on probability
                while (Math.random() < MODIFIER_SELECT_PROBABILITY) {
                    options.push(pickOneFromArray(validOptions));
                }
            } else {
                // Else a chance of selecting a single option
                if (Math.random() < MODIFIER_SELECT_PROBABILITY) {
                    options.push(pickOneFromArray(validOptions));
                }
            }

            if (options.length < 0) {
                return null;
            }

            return {
                group: {
                    ...group,
                    modifierOptions: undefined
                },
                options,
            };
        })
        .filter((selectedModifier: SelectedModifier | null) => selectedModifier !== null) as SelectedModifier[];
}

export { selectModifiersForItem }