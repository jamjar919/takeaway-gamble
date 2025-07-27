import React, { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

import styles from "./Accordion.scss";

type AccordionProps = PropsWithChildren<{
    title: ReactNode;
    open: boolean;
    onToggle: () => void;
    showHeader?: boolean;
    showToggle?: boolean;
}>;

const Accordion: React.FC<AccordionProps> = (props) => {
    const { children, open, title, onToggle, showHeader = true, showToggle = true } = props;

    return (
        <div className={styles.accordion}>
            {showHeader && (
                <button
                    className={styles.header}
                    type="button"
                    onClick={() => onToggle()}
                >
                    <div className={styles.title}>{title}</div>
                    {showToggle && (
                        <div
                            className={classNames(
                                styles.toggle,
                                open && styles.open
                            )}
                        >
                            ▼
                        </div>
                    )}
                </button>
            )}
            <div className={classNames(styles.content, open && styles.open)}>
                {children}
            </div>
        </div>
    );
};

export { Accordion };
