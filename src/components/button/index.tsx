import { ButtonHTMLAttributes, BaseSyntheticEvent } from "react";

import styles from "./index.module.css";

type Props = ButtonHTMLAttributes<HTMLElement> & {
  icon?: React.ReactElement;
  iconPosition?: "left" | "right";
  text?: string;
  variant?: "default" | "text";
  size?: "large" | "small" | "normal";
  onClick?: (e: BaseSyntheticEvent) => void;
};

function Button({
  icon,
  iconPosition = "left",
  text,
  variant = "default",
  size,
  ...props
}: Props) {
  let buttonVariant;
  switch (variant) {
    case "text":
      buttonVariant = styles.text;
      break;
    default:
      buttonVariant = styles.default;
      break;
  }

  let height;
  let iconSize;
  switch (size) {
    case "large":
      height = "76px";
      iconSize = "35px";
      break;
    case "small":
      height = "38px";
      iconSize = "20px";
      break;
    case "normal":
      height = "48px";
      iconSize = "24px";
      break;
    default:
      height = "54px";
      iconSize = "24px";
  }

  const buttonStyle = {
    height,
    width: !text ? height : undefined,
    padding: !text ? "0" : undefined,
    ...props?.style,
  };

  const iconStyles = {
    width: iconSize,
    height: iconSize,
    flexShrink: 0,
  };

  const handleClick = (e: BaseSyntheticEvent) => {
    if (props?.onClick) {
      props?.onClick(e);
    }
    e.target.blur();
  };

  return (
    <button
      {...props}
      className={`${styles.button} ${buttonVariant} ${props?.className}`}
      style={buttonStyle}
      onClick={handleClick}
    >
      {icon && iconPosition === "left" ? (
        <i style={iconStyles}>{icon}</i>
      ) : null}
      {text || null}
      {icon && iconPosition === "right" ? (
        <i style={iconStyles}>{icon}</i>
      ) : null}
    </button>
  );
}

export default Button;
