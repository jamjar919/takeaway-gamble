import {DeliverooItem} from "./deliveroo/DeliverooItem";
import {DeliverooModifierGroup} from "./deliveroo/DeliverooModifierGroup";
import {DeliverooCategory} from "./deliveroo/DeliverooCategory";
import {DeliverooAddress} from "./deliveroo/DeliverooAddress";

type RestaurantDataBundle = {
    name: string;
    url: string;
    image: string;
    address: DeliverooAddress,
    items: DeliverooItem[];
    modifierGroups: DeliverooModifierGroup[];
    categories: DeliverooCategory[];
};

export { RestaurantDataBundle };
