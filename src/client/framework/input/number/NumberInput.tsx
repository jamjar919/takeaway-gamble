import React from "react";

import { Field, useField, useFormikContext } from "formik";

import styles from "./NumberInput.scss";

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    /** Input name for Formik */
    name: string;
    label: string;
};

/**
 * Renders a Number Input with add and subtract buttons
 */
const NumberInput: React.FC<NumberInputProps> = (props) => {
    const { name, label, ...passThroughProps } = props;

    const { isSubmitting } = useFormikContext();

    const [{ value }, _, { setValue }] = useField<number>(name);

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputContainer}>
                <button
                    className={styles.left}
                    type="button"
                    onClick={() => setValue(value - 1)}
                >
                    -
                </button>
                <Field
                    {...passThroughProps}
                    className={styles.input}
                    name={name}
                    disabled={isSubmitting}
                    min="1"
                    max="5"
                />
                <button
                    className={styles.right}
                    type="button"
                    onClick={() => setValue(value + 1)}
                >
                    +
                </button>
            </div>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>
        </div>
    );
};

export { NumberInput };
