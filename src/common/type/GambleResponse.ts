import {DeliverooItem} from "../../server/type/deliveroo/DeliverooItem";
import {Restaurant} from "../../server/type/Restaurant";
import {DeliverooMenuPageState} from "../../server/type/deliveroo/DeliverooState";

export type GambleResponse = {
    all: {
        restaurants: Restaurant[];
        items: DeliverooItem[];
    },
    selected: {
        restaurant: DeliverooMenuPageState["menu"]["meta"];
        items: DeliverooItem[];
        url: string;
    }
};
