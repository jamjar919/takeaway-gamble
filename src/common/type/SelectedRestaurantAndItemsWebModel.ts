type PriceWebModel = {
    code: string; // currencyCode
    fractional: number; // eg 139
    formatted: string; // eg £1.39
};

type ModifierGroupWebModel = {
    id: string;
    name: string;
    description: string;
    minSelection: number;
    maxSelection: number;
    repeatable: boolean;
};

type ModifierOptionWebModel = {
    id: string;
    name: string;
    description: string;
    price: PriceWebModel;
    priceDiscounted: null | PriceWebModel;
    available: boolean;
};

type ItemImageWebModel = {
    typeName: string;
    altText: string;
    url: string;
    type: string;
};

type ItemWebModel = {
    id: string;
    categoryId: string;
    description: string | null;
    image: ItemImageWebModel | null;
    name: string;
    price: PriceWebModel;
    priceDiscounted: null | PriceWebModel;
    popular: boolean;
};

type CategoryWebModel = {
    id: string;
    name: string;
};

type SelectedModifierWebModel = {
    group: ModifierGroupWebModel;
    options: ModifierOptionWebModel[];
};

type SelectedItemWebModel = {
    item: ItemWebModel;
    modifiers: SelectedModifierWebModel[];
};

type SelectedRestaurantAndItemsWebModel = {
    name: string;
    url: string;
    image: string;
    address: string;
    categories: CategoryWebModel[];
    items: SelectedItemWebModel[];
};

export {
    SelectedRestaurantAndItemsWebModel,
    SelectedItemWebModel,
    SelectedModifierWebModel,
    ItemWebModel,
    CategoryWebModel,
    ModifierGroupWebModel,
    ModifierOptionWebModel,
    PriceWebModel,
    ItemImageWebModel,
};
