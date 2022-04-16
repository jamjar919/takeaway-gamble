import React from "react";
import {GambleResponse} from "../../../common/type/GambleResponse";

type GambleResultProps = {
    result: GambleResponse
};

const GambleResultPage: React.FC<GambleResultProps> = (props) => {

    const {
        result: { selected }
    } = props;

    console.log(selected);

    return (
        <>
            <h1>
                <a
                    href={`https://deliveroo.co.uk${selected.restaurant.url}`}
                    target="_blank"
                >
                    {selected.restaurant.name}
                </a>
            </h1>
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

export { GambleResultPage };
