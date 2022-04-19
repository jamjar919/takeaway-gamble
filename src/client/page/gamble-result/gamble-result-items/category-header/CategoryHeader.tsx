import React, {PropsWithChildren} from "react";

import styles from './CategoryHeader.scss';

const CategoryHeader: React.FC<PropsWithChildren<{}>> = (props) => {
    const { children } = props;

    return (
        <div className={styles.header}>
            {children}
        </div>
    )
};

export { CategoryHeader };