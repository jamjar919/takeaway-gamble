import { DeliverooMenuPageState } from "../../server/type/deliveroo/DeliverooState";
import { DeliverooItem } from "../../server/type/deliveroo/DeliverooItem";
import { DeliverooModifierOption } from "../../server/type/deliveroo/DeliverooModifierOption";
import {DeliverooModifierGroup} from "../../server/type/deliveroo/DeliverooModifierGroup";

type SelectedModifier = {
    group: Omit<DeliverooModifierGroup, 'modifierOptions'>;
    options: DeliverooModifierOption[];
}

type SelectedItem = {
    item: DeliverooItem;
    modifiers: SelectedModifier[]
}

type SelectedRestaurantAndItems = {
    restaurant: DeliverooMenuPageState["menu"]["meta"];
    items: SelectedItem[];
    url: string;
};

export {
    SelectedRestaurantAndItems,
    SelectedItem,
    SelectedModifier
}