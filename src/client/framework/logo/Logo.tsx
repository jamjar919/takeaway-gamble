import React from "react";
import classNames from "classnames";

import styles from "./Logo.scss";

type LogoProps = React.HTMLAttributes<HTMLImageElement> & {
    size?: "sm" | "lg";
    superSpin?: boolean;
};

const Logo: React.FC<LogoProps> = (props) => {
    const { superSpin = false, size = "lg", ...imageProps } = props;

    const className = classNames(
        styles.logo,
        superSpin && styles.superSpin,
        size === "sm" && styles.sm,
        size === "lg" && styles.lg
    );

    return (
        <img
            {...imageProps}
            src={"/logo.png"}
            alt="Roulette logo"
            className={className}
        />
    );
};

export { Logo };
