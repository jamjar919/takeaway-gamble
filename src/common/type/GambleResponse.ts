import { SelectedRestaurantAndItemsWebModel } from "./SelectedRestaurantAndItemsWebModel";

export type GambleResponse = SuccessfulGambleResponse | GambleErrorResponse;

export type SuccessfulGambleResponse = {
    type: "success";
    selected: SelectedRestaurantAndItemsWebModel;
};

export type GambleErrorResponse = {
    type: "error";
    error: string;
};
