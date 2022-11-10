import React, { ReactNode } from "react";
import { Field } from "formik";

import styles from "./Checkbox.scss";

type CheckboxProps = {
  name: string;
  label: ReactNode;
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name, label } = props;

  return (
    <label className={styles.checkboxLabel}>
      <Field className={styles.checkbox} name={name} type="checkbox" />
      <div className={styles.fakeCheckbox}>
        <div className={styles.fakeCheckboxBox} />
      </div>
      <div className={styles.label}>{label}</div>
    </label>
  );
};

export { Checkbox };
