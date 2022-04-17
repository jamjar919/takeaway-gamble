import {DeliverooItem} from "../../server/type/deliveroo/DeliverooItem";
import {Restaurant} from "../../server/type/Restaurant";
import {DeliverooRestaurantFull} from "../../server/type/deliveroo/DeliverooRestaurant";

export type GambleResponse = {
    all: {
        restaurants: Restaurant[],
        items: DeliverooItem[]
    },
    selected: {
        restaurant: DeliverooRestaurantFull & Restaurant,
        items: DeliverooItem[]
    }
};