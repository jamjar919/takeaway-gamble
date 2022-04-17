import React from "react";
import {GambleResponse} from "../../../common/type/GambleResponse";
import {Wheel} from "../../framework/wheel/Wheel";

type GambleResultProps = {
    result: GambleResponse
};

const GambleResultPage: React.FC<GambleResultProps> = (props) => {

    const {
        result: {
            selected: {
                restaurant,
                items
            },
            all: {
                restaurants,
            }
        }
    } = props;

    console.log(props.result);

    const wheelItems = restaurants
        .map((r) => ({
            label: r.name
        }))

    return (
        <>
            <h1>
                <a
                    href={`https://deliveroo.co.uk${restaurant.url}`}
                    target="_blank"
                >
                    {restaurant.name}
                </a>
            </h1>
            <li>
                {
                    items.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.price.formatted}
                        </li>
                    ))
                }
            </li>
            <Wheel items={wheelItems} size={500} />
        </>
    )
}

export { GambleResultPage };