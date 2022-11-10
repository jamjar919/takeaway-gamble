import { SelectedRestaurantAndItems } from "./SelectedRestaurantAndItems";

export type GambleResponse = SuccessfulGambleResponse | GambleErrorResponse;

export type SuccessfulGambleResponse = {
  type: "success";
  selected: SelectedRestaurantAndItems;
};

export type GambleErrorResponse = {
  type: "error";
  error: string;
};
