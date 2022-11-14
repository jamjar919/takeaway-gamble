type Price = {
    code: string; // currencyCode
    fractional: number; // eg 139
    formatted: string; // eg £1.39
}

type ModifierGroup = {
    id: string;
    name: string;
    description: string;
    minSelection: number;
    maxSelection: number;
    repeatable: boolean;
    modifierOptions: ModifierOption[]
}

type ModifierOption = {
    id: string;
    name: string;
    description: string;
    price: Price;
    priceDiscounted: null | Price;
    available: boolean;
}

type ItemImage = {
    typeName: string;
    altText: string;
    url: string;
    type: string;
}

type Item = {
    id: string;
    categoryId: string;
    description: string | null;
    image: ItemImage | null;
    name: string;
    price: Price;
    priceDiscounted: null | Price;
    modifierGroupIds: string[];
    popular: boolean;
}

type Category = {
    id: string;
    name: string;
}

type SelectedModifier = {
    group: ModifierGroup;
    options: ModifierOption[];
};

type SelectedItem = {
    item: Item;
    modifiers: SelectedModifier[];
};

type SelectedRestaurantAndItems = {
    name: string;
    url: string;
    image: string;
    address: string;
    categories: Category[];
    items: SelectedItem[];
};

export {
    SelectedRestaurantAndItems,
    SelectedItem,
    SelectedModifier,
    Item,
    Category,
    ModifierGroup,
    ModifierOption,
    Price,
    ItemImage
};
