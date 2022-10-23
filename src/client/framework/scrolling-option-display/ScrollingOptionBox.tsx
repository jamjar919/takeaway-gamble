import React, {ReactNode, useEffect, useRef, useState} from "react";
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

    const [height, setHeight] = useState(15);
    const [complete, setComplete] = useState(false);

    const selectedOptionRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (selectedOptionRef?.current) {
            setHeight(
                selectedOptionRef.current.getBoundingClientRect().height
            )
        }
    }, [selectedOptionRef?.current])

    if (complete) {
        return (<>{selected}</>);
    }

    return (
        <div
            className={styles.container}
            style={{ height }}
        >
            <div
                className={styles.itemList}
                style={{
                    top: "-" + height,
                    animationDuration: `${animationDuration}ms`
                }}
            >
                <ScrollingOption key="topper" style={{ height }}>
                    {pickOneFromArray(choices)}
                </ScrollingOption>
                <ScrollingOption key="selected" ref={selectedOptionRef} style={{ height }}>
                    {selected}
                </ScrollingOption>
                {choices.map((choice, index) =>
                    <ScrollingOption key={String(choice)+index} style={{ height }}>
                        {choice}
                    </ScrollingOption>
                )}
            </div>
        </div>
    )
};

ScrollingOptionBox.defaultProps = {
    animationDuration: 2000
}

export { ScrollingOptionBox }