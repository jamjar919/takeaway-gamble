import {DeliverooState} from "../../../type/deliveroo/DeliverooState";
import {UITargetAction} from "../../../type/deliveroo/DeliverooUI";

const getMenuPageCategories = (
    state: DeliverooState
): string[] => {
    const layoutGroups = state?.props?.initialState?.menuPage?.menu?.layoutGroups;

    if (!layoutGroups) {
        console.log("No layoutGroups");
        return [];
    }

    return layoutGroups
        .flatMap((group) => group.layouts)
        .filter((layouts) => layouts.typeName === "UILayoutGrid")
        .flatMap((group) => group.blocks)
        .filter((card) => card.cardTarget)
        .flatMap((card) => (card.cardTarget as UITargetAction).params[0].value)
}

export { getMenuPageCategories }