import React, {ReactNode} from "react";
import {pickOneFromArray} from "../../../common/util/pickOneFromArray";

import styles from './ScrollingOptionBox.scss';
import {ScrollingOption} from "./ScollingOption";

type ScrollingOptionDisplayProps = {
    choices: ReactNode[];
    selected: ReactNode;
}

/**
 * Displays a text container containing scrolling text that eventually
 * settles on a chosen option.
 */
const ScrollingOptionBox: React.FC<ScrollingOptionDisplayProps> = (props) => {
    const {
        choices,
        selected
    } = props;

    return (
        <div className={styles.container}>
            <div className={styles.itemList}>
                <ScrollingOption key="topper">{pickOneFromArray(choices)}</ScrollingOption>
                <ScrollingOption key="selected">{selected}</ScrollingOption>
                {choices.map((choice) =>
                    <ScrollingOption key={String(choice)}>{choice}</ScrollingOption>
                )}
            </div>
        </div>
    )
};

export { ScrollingOptionBox }