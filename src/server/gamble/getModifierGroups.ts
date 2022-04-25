import {DeliverooState} from "../type/deliveroo/DeliverooState";
import {DeliverooModifierGroup} from "../type/deliveroo/DeliverooModifierGroup";

const getModifierGroups = (state: DeliverooState): DeliverooModifierGroup[] => {
    return state.props.initialState.menuPage.menu.meta.modifierGroups;
}

export { getModifierGroups };