import React, { PropsWithChildren } from "react";
import { Icon } from "../icon/Icon";
import classNames from "classnames";
import { Size } from "../Size";

import styles from "./Badge.scss";

type BadgeProps = PropsWithChildren<{
    iconName: string;
    size?: Size;
}>;

const Badge: React.FC<BadgeProps> = (props) => {
    const { iconName, size = Size.md, children } = props;

    const containerClass = classNames(
        styles.badge,
        size == Size.sm && styles.sm,
        size == Size.md && styles.md,
        size == Size.lg && styles.lg,
        size == Size.xl && styles.xl
    );

    return (
        <div className={containerClass}>
            {iconName && (
                <div className={styles.iconContainer}>
                    <Icon name={iconName} />
                </div>
            )}
            <div className={styles.text}>{children}</div>
        </div>
    );
};

export { Badge };
