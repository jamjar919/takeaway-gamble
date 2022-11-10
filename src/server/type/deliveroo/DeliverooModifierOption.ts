import { DeliverooPrice } from "./DeliverooPrice";
import { DeliverooNutritionalItem } from "./DeliverooNutritionalItem";

type DeliverooModifierOption = {
  id: string;
  name: string;
  description: string;
  price: DeliverooPrice;
  priceDiscounted: null | DeliverooPrice;
  nutritionalInfo: DeliverooNutritionalItem;
  available: boolean;
  modifierGroupIds: [];
};

export { DeliverooModifierOption };
