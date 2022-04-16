import {DeliverooPrice} from "./DeliverooPrice";

type DeliverooItem = {
    available: boolean,
    categoryId: string,
    description: string | null
    id: string
    image: unknown
    name: string
    price: DeliverooPrice
    priceDiscounted?: DeliverooPrice
    productInformation: string
}

export { DeliverooItem }