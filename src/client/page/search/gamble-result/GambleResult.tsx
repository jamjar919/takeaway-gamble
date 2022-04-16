import {GambleResponse} from "../../../../common/type/GambleResponse";
import React from "react";

type GambleResultProps = {
    result: GambleResponse
};

const GambleResult: React.FC<GambleResultProps> = (props) => {

    const {
        result: { selected }
    } = props;

    return (
        <>
            <h1>{selected.restaurant.name}</h1>
            <li>
                {
                    selected.items.map((item) => (
                        <li key={item.id}>
                            {item.name} - {item.price.formatted}
                        </li>
                    ))
                }
            </li>
        </>
    )
}

export { GambleResult }