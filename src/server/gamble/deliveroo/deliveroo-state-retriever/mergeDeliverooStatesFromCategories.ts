import { DeliverooState } from "../../../type/deliveroo/DeliverooState";
import { getMenuItemsFromDeliverooState } from "../deliveroo-state-selector/getMenuItemsFromDeliverooState";
import { getModifierGroupsFromDeliverooState } from "../deliveroo-state-selector/getModifierGroupsFromDeliverooState";
import { DeliverooCategory } from "../../../type/deliveroo/DeliverooCategory";

// Merge several menu states into one super state
// just merges the menu items
const mergeDeliverooStatesFromCategories = (
  rootState: DeliverooState,
  categoryStates: DeliverooState[],
  categories: DeliverooCategory[]
): DeliverooState => {
  if (categoryStates.length < 1) {
    throw new Error("Cannot merge 0 states");
  }

  const initial: DeliverooState = {
    props: {
      initialState: {
        ...rootState.props.initialState,
        menuPage: {
          ...rootState.props.initialState.menuPage,
          menu: {
            ...rootState.props.initialState.menuPage.menu,
            meta: {
              ...rootState.props.initialState.menuPage.menu.meta,
              items: [],
              modifierGroups: [],
              categories,
            },
            layoutGroups: [], // we don't care about these
          },
        },
      },
    },
  };

  // console.log(rootState.props.initialState.menuPage.menu.layoutGroups[0].layouts[0].blocks[0].lines[0].spans[0].text);

  return categoryStates.reduce((acc, current) => {
    const items = getMenuItemsFromDeliverooState(current);
    const modifiers = getModifierGroupsFromDeliverooState(current);

    const prevItems = getMenuItemsFromDeliverooState(acc);
    const prevModifiers = getModifierGroupsFromDeliverooState(acc);

    acc.props.initialState.menuPage.menu.meta.items = prevItems.concat(items);
    acc.props.initialState.menuPage.menu.meta.modifierGroups =
      prevModifiers.concat(modifiers);

    return acc;
  }, initial);
};

export { mergeDeliverooStatesFromCategories };
