import React, { InputHTMLAttributes } from "react";

import styles from "./index.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
};

function Input({ label, icon, iconPosition, ...props }: Props) {
  return (
    <div className={styles.inputContainer}>
      {label}
      <div className={styles.input}>
        {icon && iconPosition === "left" ? <i>{icon}</i> : null}
        <input {...props} />
        {icon && iconPosition === "right" ? <i>{icon}</i> : null}
      </div>
    </div>
  );
}

export default Input;
