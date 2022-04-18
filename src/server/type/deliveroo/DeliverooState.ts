import {UILayoutList} from "./DeliverooUI";
import {DeliverooItem} from "./DeliverooItem";
import {DeliverooRestaurantFull, DeliverooRestaurantMeta} from "./DeliverooRestaurant";
import {DeliverooCategory} from "./DeliverooCategory";

type DeliverooMenuPageState = {
    menu: {
        meta: {
            items: DeliverooItem[],
            categories: DeliverooCategory[],
            restaurant: DeliverooRestaurantFull,
            metatags: DeliverooRestaurantMeta
        }
    }
}

type DeliverooHomeState = {
    feed: {
        meta: {
            title: string,
            restaurantCount: {results: number, location: number}
        },
        results: {
            data: UILayoutList[]
        }
    }
}

/** Reverse engineered Deliveroo page state */
type DeliverooState = {
    props: {
        initialState: {
            home: DeliverooHomeState,
            menuPage: DeliverooMenuPageState
        }
    }
};

export { DeliverooState, DeliverooMenuPageState }
