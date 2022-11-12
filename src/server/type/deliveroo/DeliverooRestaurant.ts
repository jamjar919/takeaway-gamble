import { DeliverooAddress } from "./DeliverooAddress";

type DeliverooRestaurant = {
    id: string;
    name: string;
    links: {
        self: {
            href: string;
        };
    };
};

type DeliverooRestaurantFull = {
    currencyCode: string;
    currencySymbol: string;
    deliversToCustomerLocation: boolean;
    hasOrderNotes: boolean;
    id: string;
    location: {
        cityId: number;
        zoneId: number;
        address: DeliverooAddress;
    };
    menuDisabled: boolean;
    menuId: string;
    drnId: string;
    name: string;
    tipMessage: null | string;
};

type DeliverooRestaurantMeta = {
    description: string;
    descriptionSocial: string;
    image: string;
    imageHeight: number;
    imageWidth: number;
    title: string;
    titleSocial: string;
};

export {
    DeliverooRestaurant,
    DeliverooRestaurantFull,
    DeliverooRestaurantMeta,
};
