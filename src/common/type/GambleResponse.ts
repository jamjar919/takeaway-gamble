import {DeliverooItem} from "../../server/type/deliveroo/DeliverooItem";
import {Restaurant} from "../../server/type/Restaurant";
import {SelectedRestaurantAndItems} from "./SelectedRestaurantAndItems";

export type GambleResponse = SuccessfulGambleResponse | RequiresCaptchaResponse | GambleErrorResponse;

export type SuccessfulGambleResponse = {
    type: 'success'
    all: {
        restaurants: Restaurant[];
        items: DeliverooItem[];
    },
    selected: SelectedRestaurantAndItems
};

export type RequiresCaptchaResponse = {
    type: 'requires_captcha',
    html: string;
}

export type GambleErrorResponse = {
    type: 'error'
    error: string;
}