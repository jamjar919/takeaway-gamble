import {DeliverooAddress} from "./DeliverooAddress";

type DeliverooRestaurant = {
    id: string,
    name: string,
    links: {
        self: {
            href: string
        }
    }
};

type DeliverooRestaurantFull = {
    currencyCode: string,
    currencySymbol: string,
    deliversToCustomerLocation: boolean
    drnId: boolean,
    hasOrderNotes: boolean,
    id: string,
    location: {
        address: DeliverooAddress
    }
    menuDisabled: boolean,
    menuId: string,
    name: string
    tipMessage: null | string
}

export { DeliverooRestaurant, DeliverooRestaurantFull }