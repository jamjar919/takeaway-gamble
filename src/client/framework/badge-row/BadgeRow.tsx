import React, { PropsWithChildren } from "react";

import styles from "./BadgeRow.scss";

type BadgeRowProps = PropsWithChildren<{}>;

const BadgeRow: React.FC<BadgeRowProps> = (props) => {
    const { children } = props;

    return <div className={styles.badgeRow}>{children}</div>;
};

export { BadgeRow };
