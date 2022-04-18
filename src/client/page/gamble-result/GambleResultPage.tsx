import React from "react";
import {GambleResponse} from "../../../common/type/GambleResponse";
import {ScrollingOptionDisplay} from "../../framework/scrolling-option-display/ScrollingOptionDisplay";

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

    return (
        <>
            <h1>
                <a
                    href={`https://deliveroo.co.uk${restaurant.url}`}
                    target="_blank"
                >
                    <ScrollingOptionDisplay
                        choices={restaurants.map(r => r.name)}
                        selected={restaurant.name}
                    />
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
        </>
    )
}

export { GambleResultPage };