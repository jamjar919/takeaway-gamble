import { DeliverooPrice } from "./DeliverooPrice";
import { DeliverooNutritionalItem } from "./DeliverooNutritionalItem";

type DeliverooItemImage = {
    typeName: string;
    altText: string;
    url: string;
    type: string;
};

type DeliverooItem = {
    available: boolean;
    categoryId: string;
    description: string | null;
    id: string;
    image: DeliverooItemImage | null;
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

export { DeliverooItem, DeliverooItemImage };
