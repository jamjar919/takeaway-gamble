import React from "react";
import classNames from "classnames";

import styles from "./Logo.scss";

type LogoProps = React.HTMLAttributes<HTMLDivElement> & {
    size?: "sm" | "lg";
    superSpin?: boolean;
};

const Logo: React.FC<LogoProps> = (props) => {
    const { superSpin = false, size = "lg", ...divProps } = props;

    const randomOffset = React.useMemo(() => {
        if (process.env.NODE_ENV === "test") {
            return 0;
        }
        return Math.random() * 360;
    }, []);

    const wheelStyle: React.CSSProperties = {
        "--wheel-final-rotation": `${720}deg`,
    } as React.CSSProperties;

    const ballStyle: React.CSSProperties = {
        "--ball-final-rotation": `${-720 + randomOffset}deg`,
    } as React.CSSProperties;

    const className = classNames(
        styles.logo,
        superSpin && styles.superSpin,
        size === "sm" && styles.sm,
        size === "lg" && styles.lg
    );

    return (
        <div {...divProps} className={className}>
            <img
                src="/logo.png"
                alt="Roulette logo"
                className={styles.wheel}
                style={wheelStyle}
            />
            <svg className={styles.ballSvg} viewBox="0 0 200 200">
                <g className={styles.ball} style={ballStyle}>
                    <circle cx="100" cy="100" r="6" fill="#fff" />
                </g>
            </svg>
        </div>
    );
};

export { Logo };
