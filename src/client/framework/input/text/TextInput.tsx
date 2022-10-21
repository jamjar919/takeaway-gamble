import {Field} from "formik";
import React from "react";

import styles from './TextInput.scss';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    left?: React.ReactNode,
    right?: React.ReactNode
}

const TextInput: React.FC<TextInputProps> = (props) => {
    const {
        name,
        left,
        right,
        ...passThroughProps
    } = props;

    return (
        <div className={styles.inputContainer}>
            <div className={styles.left}>
                {left}
            </div>
            <Field
                {...passThroughProps}
                className={styles.input}
                name={name}
            />
            <div className={styles.right}>
                {right}
            </div>
        </div>
    )
}

export { TextInput };