import {
  DeliverooMenuPageState,
  DeliverooState,
} from "../../type/deliveroo/DeliverooState";

const getPlaceToEatMetaFromDeliverooState = (
  state: DeliverooState
): DeliverooMenuPageState["menu"]["meta"] => {
  return state.props.initialState.menuPage.menu.meta;
};

export { getPlaceToEatMetaFromDeliverooState };
