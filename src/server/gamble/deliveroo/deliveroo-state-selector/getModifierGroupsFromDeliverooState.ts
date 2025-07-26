import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { DeliverooModifierGroup } from "../../../type/deliveroo/DeliverooModifierGroup";

const getModifierGroupsFromDeliverooState = (
    state: DeliverooState
): DeliverooModifierGroup[] => {
    return (
        state.props.initialState.menuPage.menu.metas.root.modifierGroups
    );
};

export { getModifierGroupsFromDeliverooState };
