import React from "react";
import classNames from "classnames";

import styles from "./Logo.scss";

type LogoProps = React.HTMLAttributes<SVGSVGElement> & {
    size?: "sm" | "lg";
    superSpin?: boolean;
};

const NUM_SEGMENTS = 18;

const Logo: React.FC<LogoProps> = (props) => {
    const { superSpin = false, size = "lg", ...svgProps } = props;

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

    const segments = React.useMemo(() => {
        const radius = 100;
        const angle = (2 * Math.PI) / NUM_SEGMENTS;
        const center = 100;
        const paths = [] as React.ReactNode[];
        for (let i = 0; i < NUM_SEGMENTS; i++) {
            const start = i * angle;
            const end = start + angle;
            const x1 = center + radius * Math.cos(start);
            const y1 = center + radius * Math.sin(start);
            const x2 = center + radius * Math.cos(end);
            const y2 = center + radius * Math.sin(end);
            const d = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
            const fill = i % 2 === 0 ? "#c00" : "#000";
            paths.push(<path key={i} d={d} fill={fill} />);
        }
        return paths;
    }, []);

    return (
        <svg
            {...svgProps}
            viewBox="0 0 200 200"
            className={className}
            role="img"
            aria-label="Roulette logo"
        >
            <g className={styles.wheel} style={wheelStyle}>
                {segments}
                <circle
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                />
            </g>
            <g className={styles.ball} style={ballStyle}>
                <circle cx="100" cy="100" r="6" fill="#fff" />
            </g>
        </svg>
    );
};

export { Logo };
