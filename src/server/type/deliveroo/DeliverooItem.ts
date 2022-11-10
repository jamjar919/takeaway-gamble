import { DeliverooPrice } from "./DeliverooPrice";
import { DeliverooNutritionalItem } from "./DeliverooNutritionalItem";

type DeliverooItem = {
  available: boolean;
  categoryId: string;
  description: string | null;
  id: string;
  image: {
    typeName: string;
    altText: string;
    url: string;
    type: string;
  } | null;
  name: string;
  price: DeliverooPrice;
  priceDiscounted: null | DeliverooPrice;
  productInformation: string;
  nutritionalInfo: null | DeliverooNutritionalItem;
  percentageDiscounted: null | string;
  popular: boolean;
  maxSelection: null | string;
  modifierGroupIds: string[];
  isSignatureExclusive: boolean;
};

export { DeliverooItem };
