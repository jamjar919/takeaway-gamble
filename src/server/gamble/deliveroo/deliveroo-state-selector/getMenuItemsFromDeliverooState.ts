import { DeliverooItem } from "../../../type/deliveroo/DeliverooItem";
import { DeliverooState } from "../../../type/deliveroo/DeliverooState";

const getMenuItemsFromDeliverooState = (
    state: DeliverooState
): DeliverooItem[] => {
    const items = state?.props?.initialState?.menuPage?.menu?.meta?.items;

    if (!items) {
        console.log("No items in state");
        return [];
    }

    return items.filter((item) => item.available);
};

export { getMenuItemsFromDeliverooState };
