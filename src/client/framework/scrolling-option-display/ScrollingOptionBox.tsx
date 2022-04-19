import React, {ReactNode, useEffect, useState} from "react";
import {pickOneFromArray} from "../../../common/util/pickOneFromArray";

import styles from './ScrollingOptionBox.scss';
import {ScrollingOption} from "./ScollingOption";

type ScrollingOptionDisplayProps = {
    /** The choices for the scrolling option box */
    choices: ReactNode[];
    /** The selected option */
    selected: ReactNode;
    /** Time for the animation to complete in milliseconds */
    animationDuration?: number;
    /** Function to run when the animation completes */
    onComplete?: () => void;
}

/**
 * Displays a text container containing scrolling text that eventually
 * settles on a chosen option.
 */
const ScrollingOptionBox: React.FC<ScrollingOptionDisplayProps> = (props) => {
    const {
        choices,
        selected,
        animationDuration,
        onComplete
    } = props;

    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const id = setTimeout(
            () => {
                setComplete(true);

                if (onComplete) {
                    onComplete();
                }
            },
            animationDuration
        );

        return () => clearTimeout(id);
    })

    if (complete) {
        return (<>{selected}</>);
    }

    return (
        <div className={styles.container}>
            <div
                className={styles.itemList}
                style={{ animationDuration: `${animationDuration}ms` }}
            >
                <ScrollingOption key="topper">{pickOneFromArray(choices)}</ScrollingOption>
                <ScrollingOption key="selected">{selected}</ScrollingOption>
                {choices.map((choice) =>
                    <ScrollingOption key={String(choice)}>{choice}</ScrollingOption>
                )}
            </div>
        </div>
    )
};

ScrollingOptionBox.defaultProps = {
    animationDuration: 2000
}

export { ScrollingOptionBox }