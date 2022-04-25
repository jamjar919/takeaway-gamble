import {DeliverooPrice} from "../../server/type/deliveroo/DeliverooPrice";

type WithPriceAndDiscountedPrice = {
    price: DeliverooPrice,
    priceDiscounted: null | DeliverooPrice
}

const getPriceFromDeliverooObject = <T extends WithPriceAndDiscountedPrice, >(item: T) => {
    if (item.priceDiscounted) {
        return item.priceDiscounted;
    }

    return item.price;
}

export { getPriceFromDeliverooObject };
