import { DeliverooRestaurant } from "./DeliverooRestaurant";

type UITargetRestaurant = {
    typeName: "UITargetRestaurant";
    restaurant: DeliverooRestaurant;
};

type UITargetAction = {
    typeName: "UITargetAction";
    action: "SHOW_CATEGORY" | "";
    params: [
        {
            id: "category_id";
            value: string[];
        }
    ];
};

type UiCardSpan = {
    typeName: "UISpanText";
    key: string;
    text: string;
    size: string;
};

type UiCardLine = {
    typeName: "UITextLine";
    key: string;
    align: string;
    spans: UiCardSpan[];
};

type UICard = {
    content: string;
    typeName: "UICard";
    lines?: UiCardLine[];
    target?: UITargetRestaurant;
    cardTarget?: UITargetAction;
};

type UILayoutList = {
    key: string;
    typeName: "UILayoutList";
    blocks: UICard[];
};

type UILayoutGrid = {
    typeName: "UILayoutGrid";
    blocks: UICard[];
};

export { UILayoutList, UILayoutGrid, UITargetAction, UITargetRestaurant };
