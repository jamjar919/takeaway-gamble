import { UILayoutList } from "./DeliverooUI";
import { DeliverooItem } from "./DeliverooItem";
import {
  DeliverooRestaurantFull,
  DeliverooRestaurantMeta,
} from "./DeliverooRestaurant";
import { DeliverooCategory } from "./DeliverooCategory";
import { DeliverooModifierGroup } from "./DeliverooModifierGroup";

type DeliverooMenuMetaState = {
  items: DeliverooItem[];
  categories: DeliverooCategory[];
  restaurant: DeliverooRestaurantFull;
  metatags: DeliverooRestaurantMeta;
  modifierGroups: DeliverooModifierGroup[];
  requestUUID: string;
  appliedParams: [];
  pastOrders: [];
  offer: null | unknown;
  customerLocation: {
    lat: number;
    lon: number;
    city: string;
    neighborhood: string;
    postcode: string;
    cityId: number;
    zoneId: number;
    geohash: string;
  };
};

type DeliverooMenuPageState = {
  menu: {
    meta: DeliverooMenuMetaState
  };
};

type DeliverooHomeState = {
  feed: {
    meta: {
      title: string;
      restaurantCount: { results: number; location: number };
    };
    results: {
      data: UILayoutList[];
    };
  };
};

/** Reverse engineered Deliveroo page state */
type DeliverooState = {
  props: {
    initialState: {
      home: DeliverooHomeState;
      menuPage: DeliverooMenuPageState;
    };
  };
};

export { DeliverooState, DeliverooMenuPageState, DeliverooMenuMetaState };
