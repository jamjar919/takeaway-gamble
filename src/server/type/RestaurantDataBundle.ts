import { Restaurant } from "./Restaurant";
import {
  DeliverooMenuMetaState,
  DeliverooState,
} from "./deliveroo/DeliverooState";

type RestaurantDataBundle = {
  selectedPlace: Restaurant;
  restaurantContext: DeliverooState;
  selectedPlaceMeta: DeliverooMenuMetaState;
};

export { RestaurantDataBundle };
