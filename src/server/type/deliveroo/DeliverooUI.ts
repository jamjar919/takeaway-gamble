import { DeliverooRestaurant } from "./DeliverooRestaurant";

type UITargetRestaurant = {
  typeName: "UITargetRestaurant";
  restaurant: DeliverooRestaurant;
};

type UITargetAction = {
  typeName: "UITargetAction";
  action: "SHOW_CATEGORY" | "",
  params: [
    {
      id: "category_id",
      value: string[],
    }
  ]
}

type UICard = {
  content: string;
  typeName: "UICard";
  lines: any[],
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
}

export { UILayoutList, UILayoutGrid, UITargetAction, UITargetRestaurant };
