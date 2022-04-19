import {DeliverooPrice} from "./DeliverooPrice";

type DeliverooModifierOption = {
    id: string;
    name: string;
    description: string;
    price: DeliverooPrice,
    nutritionalInfo: null,
    priceDiscounted: null | DeliverooPrice,
    available: boolean,
    modifierGroupIds:[]
}

type DeliverooModifierGroup = {
    id: string;
    name: string;
    description: string;
    minSelection: number;
    maxSelection: number;
    repeatable: boolean;
    modifierOptions: DeliverooModifierOption[]
};

export { DeliverooModifierGroup };
