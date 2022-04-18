import React from "react";

import styles from './ScrollingOptionBox.scss';

type ScrollingOptionProps = React.PropsWithChildren<{}>

const ScrollingOption: React.FC<ScrollingOptionProps> = (props) => {
    const {
        children
    } = props;

    return (
        <div className={styles.option}>
            {children}
        </div>
    )
}

export { ScrollingOption }