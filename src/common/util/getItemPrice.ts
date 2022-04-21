import {DeliverooItem} from "../../server/type/deliveroo/DeliverooItem";

const getItemPrice = (item: DeliverooItem) => {
    if (item.priceDiscounted) {
        return item.priceDiscounted;
    }

    return item.price;
}

export { getItemPrice };