import { DeliverooRestaurant } from "./DeliverooRestaurant";

type UITargetRestaurant = {
    typeName: "UITargetRestaurant";
    restaurant: DeliverooRestaurant;
};

type UITargetAction = {
    typeName: 'UITargetShowSection',
    sectionParams: [{
        id: 'category_id' | 'source' | 'linked_request_uuid',
        value: string[]
    }]
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

type UIRooBlock = {
    typeName: "UIRooBlock",
    data: {
        "distance-presentational.content": string
        "estimated-delivery-bubble-type-default-partner-delivery-time.content": string
        "partner-card.on-tap": {
            action: {
                name: "navigate_to_restaurant"
                parameters: {
                    restaurant_href: string,
                    restaurant_name: string
                }
            }
        }

    }
}

type UILayoutList = {
    key: string;
    typeName: "UILayoutList";
    blocks: UIRooBlock[];
};

type UILayoutGrid = {
    typeName: "UILayoutGrid";
    blocks: UICard[];
};

export { UILayoutList, UILayoutGrid, UITargetAction, UITargetRestaurant, UIRooBlock };
