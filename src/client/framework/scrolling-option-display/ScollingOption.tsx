import React from "react";

import styles from './ScrollingOptionBox.scss';

type ScrollingOptionProps = React.PropsWithChildren<{}> & {
    style?: React.CSSProperties
}

const ScrollingOption = React.forwardRef<HTMLDivElement, ScrollingOptionProps>(
    (props, ref) => {
        const {
            children,
            style
        } = props;

        return (
            <div ref={ref} className={styles.option} style={style}>
                {children}
            </div>
        )
    }
)

export { ScrollingOption }