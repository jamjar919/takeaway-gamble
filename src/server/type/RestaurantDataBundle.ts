import { Restaurant } from "./Restaurant";
import {
  DeliverooMenuPageState,
  DeliverooState,
} from "./deliveroo/DeliverooState";

type RestaurantDataBundle = {
  selectedPlace: Restaurant;
  restaurantContext: DeliverooState;
  selectedPlaceMeta: DeliverooMenuPageState["menu"]["meta"];
};

export { RestaurantDataBundle };
