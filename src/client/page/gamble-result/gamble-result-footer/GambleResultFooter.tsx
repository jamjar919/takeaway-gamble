import React from "react";

import styles from './GambleResultFooter.scss';

const GambleResultFooter: React.FC = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerItem}>
                Developed by <a href={"https://thejamespaterson.com"}>James Paterson</a>
            </div>
            <div className={styles.footerItem}>❂</div>
            <div className={styles.footerItem}>
                Not affiliated with Deliveroo or Just Eat
            </div>
        </div>
    )
}

export { GambleResultFooter }