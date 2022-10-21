import React from "react";
import {useFormikContext} from "formik";
import classNames from "classnames";

import styles from "./Logo.scss";

const Logo: React.FC = () => {
    const { isSubmitting } = useFormikContext();

    const className = classNames(
        styles.logo,
        isSubmitting && styles.superSpin
    )

    return (
        <div className={styles.logoContainer}>
            <img src={"/logo.png"} alt="Roulette logo" className={className}/>
        </div>
    )
}

export { Logo };