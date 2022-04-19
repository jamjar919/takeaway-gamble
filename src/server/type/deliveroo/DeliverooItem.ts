import {DeliverooPrice} from "./DeliverooPrice";

type DeliverooItem = {
    available: boolean,
    categoryId: string,
    description: string | null
    id: string
    image: {
        typeName: string,
        altText: string,
        url: string,
        type: string
    } | null,
    name: string
    price: DeliverooPrice
    priceDiscounted?: null | DeliverooPrice
    productInformation: string,
    nutritionalInfo: null | string,
    percentageDiscounted: null | string,
    popular: boolean,
    maxSelection: null | string,
    modifierGroupIds: unknown[],
    isSignatureExclusive: boolean
}

export { DeliverooItem }