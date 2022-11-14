import {Item, ModifierGroup, ModifierOption, SelectedModifier} from "../../../common/type/SelectedRestaurantAndItems";
import { pickOneFromArray } from "../../../common/util/pickOneFromArray";
import { getPriceFromDeliverooObject } from "../../../common/util/getPriceFromDeliverooObject";

const MODIFIER_SELECT_PROBABILITY = 0.5;

const getPriceOfSelectedModifiers = (options: ModifierOption[]) =>
    options
        .map((option) => getPriceFromDeliverooObject(option))
        .reduce((a, b) => b.fractional + a, 0);

const selectModifiersForItem = (
    item: Item,
    modifiers: ModifierGroup[],
    priceLimit: number
): SelectedModifier[] => {
    const validModifierGroupsForItem = modifiers.filter((group) =>
        item.modifierGroupIds.includes(group.id)
    );

    return (
        validModifierGroupsForItem
            .map((group) => {
                const options: ModifierOption[] = [];

                let validOptions = group.modifierOptions.filter(
                    (option) => option.available
                );

                // Select any required options
                while (options.length < group.minSelection) {
                    options.push(pickOneFromArray(validOptions));
                }

                const canSelectOption = () =>
                    Math.random() < MODIFIER_SELECT_PROBABILITY &&
                    validOptions.length > 0 &&
                    options.length < group.maxSelection &&
                    getPriceOfSelectedModifiers(options) < priceLimit;

                // Optionally select any up to the maximum options
                // Chance of selecting multiple options based on probability
                while (canSelectOption()) {
                    const selectedOption = pickOneFromArray(validOptions);
                    validOptions = validOptions.filter(
                        (option) => option.id !== selectedOption.id
                    );
                    options.push(selectedOption);
                }

                if (options.length < 0) {
                    return null;
                }

                return {
                    group: group,
                    options,
                };
            })
            .filter(
                (selectedModifier: SelectedModifier | null) =>
                    selectedModifier !== null
            ) as SelectedModifier[]
    ).filter(
        (selectedModifier: SelectedModifier) =>
            selectedModifier.options.length > 0
    );
};

export { selectModifiersForItem };
