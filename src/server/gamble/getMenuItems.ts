import {DeliverooItem} from "../type/deliveroo/DeliverooItem";
import {DeliverooState} from "../type/deliveroo/DeliverooState";

const getMenuItems = (state: DeliverooState): DeliverooItem[] => {
    return state.props.initialState.menuPage.menu.meta.items;
}

export { getMenuItems };