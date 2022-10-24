import {SelectedRestaurantAndItems} from "./SelectedRestaurantAndItems";

export type GambleResponse = SuccessfulGambleResponse | RequiresCaptchaResponse | GambleErrorResponse;

export type SuccessfulGambleResponse = {
    type: 'success'
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