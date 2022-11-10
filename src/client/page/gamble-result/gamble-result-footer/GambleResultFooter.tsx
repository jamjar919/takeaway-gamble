import React from "react";

import styles from './GambleResultFooter.scss';
import {FooterContent} from "../../../framework/footer/FooterContent";

const GambleResultFooter: React.FC = () => {
    return (
        <div className={styles.footer}>
            <FooterContent />
        </div>
    )
}

export { GambleResultFooter }