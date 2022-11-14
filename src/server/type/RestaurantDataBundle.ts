import {Category, Item, ModifierGroup} from "../../common/type/SelectedRestaurantAndItems";

type RestaurantDataBundle = {
    name: string;
    url: string;
    image: string;
    address: string,
    items: Item[];
    modifierGroups: ModifierGroup[];
    categories: Category[];
};

export { RestaurantDataBundle };
