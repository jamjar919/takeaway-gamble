import React from "react";
import {pickOneFromArray} from "../../../server/util/pickOneFromArray";

type ScrollingOptionDisplayProps = {
    choices: string[];
    selected: string;
}

/**
 * Displays a text container containing scrolling text that eventually
 * settles on a chosen option.
 */
const ScrollingOptionDisplay: React.FC<ScrollingOptionDisplayProps> = (props) => {
    const {
        choices,
        selected
    } = props;

    const list = (<>
        <div key="topper">{pickOneFromArray(choices)}</div>
        <div key="selected">{selected}</div>
        {choices.map((choice) => <div key={choice}>{choice}</div>)}
    </>)

    return (<div>
        {list}
    </div>)
};

export { ScrollingOptionDisplay }