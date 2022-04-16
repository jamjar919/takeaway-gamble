import {UILayoutList} from "./DeliverooUI";

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
            home: DeliverooHomeState
        }
    }
};

export { DeliverooState }
