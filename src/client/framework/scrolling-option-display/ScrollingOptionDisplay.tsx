import React from "react";

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

    return <span />
};

export { ScrollingOptionDisplay }