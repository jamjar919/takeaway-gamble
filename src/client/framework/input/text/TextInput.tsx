import { Field, useFormikContext } from "formik";
import React from "react";

import styles from "./TextInput.scss";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Input name for Formik */
  name: string;
  /** Optional left addon */
  left?: React.ReactNode;
  /** Optional right addon */
  right?: React.ReactNode;
};

/**
 * Renders a text input with additional addons to the side of the input
 */
const TextInput: React.FC<TextInputProps> = (props) => {
  const { name, left, right, ...passThroughProps } = props;

  const { isSubmitting } = useFormikContext();

  return (
    <div className={styles.inputContainer}>
      <div className={styles.left}>{left}</div>
      <Field
        {...passThroughProps}
        className={styles.input}
        name={name}
        disabled={isSubmitting}
      />
      <div className={styles.right}>{right}</div>
    </div>
  );
};

export { TextInput };
