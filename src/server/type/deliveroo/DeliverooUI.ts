import {DeliverooRestaurant} from "./DeliverooRestaurant";

type UITargetRestaurant = {
    typeName: "UITargetRestaurant",
    restaurant: DeliverooRestaurant
}

type UICard = {
    content: string,
    typeName: "UICard",
    target: UITargetRestaurant
}

type UILayoutList = {
    key: string,
    typeName: "UILayoutList",
    blocks: UICard[]
}

export {
    UILayoutList
};