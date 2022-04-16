import {DeliverooItem} from "../../server/type/deliveroo/DeliverooItem";
import {Restaurant} from "../../server/type/Restaurant";

export type GambleResponse = {
    all: {
        restaurants: Restaurant[],
        items: DeliverooItem[]
    },
    selected: {
        restaurant: Restaurant,
        items: DeliverooItem[]
    }
}