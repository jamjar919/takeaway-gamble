import { DeliverooItem } from "../../server/type/deliveroo/DeliverooItem";
import { DeliverooModifierOption } from "../../server/type/deliveroo/DeliverooModifierOption";
import { DeliverooModifierGroup } from "../../server/type/deliveroo/DeliverooModifierGroup";
import {DeliverooCategory} from "../../server/type/deliveroo/DeliverooCategory";
import {DeliverooAddress} from "../../server/type/deliveroo/DeliverooAddress";

type SelectedModifier = {
    group: Omit<DeliverooModifierGroup, "modifierOptions">;
    options: DeliverooModifierOption[];
};

type SelectedItem = {
    item: DeliverooItem;
    modifiers: SelectedModifier[];
};

type SelectedRestaurantAndItems = {
    name: string;
    url: string;
    image: string;
    address: DeliverooAddress,
    categories: DeliverooCategory[]
    items: SelectedItem[];
};

export { SelectedRestaurantAndItems, SelectedItem, SelectedModifier };
