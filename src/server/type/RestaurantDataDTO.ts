type PriceDTO = {
    code: string; // currencyCode
    fractional: number; // eg 139
    formatted: string; // eg £1.39
};

type ModifierGroupDTO = {
    id: string;
    name: string;
    description: string;
    minSelection: number;
    maxSelection: number;
    repeatable: boolean;
    modifierOptions: ModifierOptionDTO[];
};

type ModifierOptionDTO = {
    id: string;
    name: string;
    description: string;
    price: PriceDTO;
    priceDiscounted: null | PriceDTO;
    available: boolean;
};

type ItemImageDTO = {
    typeName: string;
    altText: string;
    url: string;
    type: string;
};

type ItemDTO = {
    id: string;
    categoryId: string;
    description: string | null;
    image: ItemImageDTO | null;
    name: string;
    price: PriceDTO;
    priceDiscounted: null | PriceDTO;
    modifierGroupIds: string[];
    popular: boolean;
};

type CategoryDTO = {
    id: string;
    name: string;
};

type RestaurantDataDTO = {
    name: string;
    url: string;
    image: string;
    address: string;
    items: ItemDTO[];
    modifierGroups: ModifierGroupDTO[];
    categories: CategoryDTO[];
    isAvailable: boolean;
};

type SelectedModifierDTO = {
    group: ModifierGroupDTO;
    options: ModifierOptionDTO[];
};

type SelectedItemDTO = {
    item: ItemDTO;
    modifiers: SelectedModifierDTO[];
};

export {
    SelectedItemDTO,
    SelectedModifierDTO,
    RestaurantDataDTO,
    CategoryDTO,
    ItemDTO,
    ItemImageDTO,
    ModifierGroupDTO,
    ModifierOptionDTO,
    PriceDTO,
};
