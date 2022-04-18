import React from "react";
import {GambleResponse} from "../../../common/type/GambleResponse";
import { ScrollingOptionBox } from "../../framework/scrolling-option-display/ScrollingOptionBox";

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
                <ScrollingOptionBox
                    choices={restaurants.map(r => r.name)}
                    selected={
                        <a
                            href={`https://deliveroo.co.uk${restaurant.url}`}
                            target="_blank"
                        >{restaurant.name}</a>
                    }
                />
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