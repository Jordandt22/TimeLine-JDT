import React from "react";
import { debounce } from "throttle-debounce";

function CustomButton(props) {
  const { onClick, buttonProps, disabled, className } = props;
  const debounceClick = debounce(200, onClick);

  return (
    <button
      className={`${className} ${disabled ? "disabled-button" : ""}`}
      {...buttonProps}
      onClick={debounceClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
}

export default CustomButton;
