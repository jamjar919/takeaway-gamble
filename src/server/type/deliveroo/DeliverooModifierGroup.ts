import { DeliverooModifierOption } from "./DeliverooModifierOption";

type DeliverooModifierGroup = {
    id: string;
    name: string;
    description: string;
    minSelection: number;
    maxSelection: number;
    repeatable: boolean;
    modifierOptions: DeliverooModifierOption[];
};

export { DeliverooModifierGroup };
