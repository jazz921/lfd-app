"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "text" | "contained" | "outlined";
  click?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  text?: string;
  className?: string;
  type?: "button" | "submit"
}

const Button = ({
  children,
  click,
  disabled,
  text,
  variant,
  className = "",
  type = "button",
  ...rest
}: ButtonProps) => {
  const handleClick = () => {
    if (click) {
      click();
    }
  };

  const handleDisabled = () => {
    if (disabled) {
      return "opacity-50 even pointer-events-none";
    }
    return "cursor-pointer";
  };

  if (variant === "contained") {
    return (
      <button
        {...rest}
        onClick={handleClick}
        type={type}
        className={`${className} ${handleDisabled()} font-avenir-light bg-black text-white text-sm p-[11.5px] transition-colors duration-500 ease-in-out hover:bg-sky-blue`}
      >
        <span>{text ? text : children}</span>
      </button>
    );
  }

  if (variant === "text") {
    return <button {...rest}></button>;
  }

  if (variant === "outlined") {
    return (
      <button
        {...rest}
        type={type}
        onClick={handleClick}
        className={`${className} font-avenir-regular group relative p-[8px] border-2 border-black overflow-hidden cursor-pointer transition-text duration-500 ease-out hover:border-sky-blue`}
      >
        <div className="absolute inset-0 bg-sky-blue z-0 translate-x-[-100%] transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
        <span className="relative z-10 transition-text duration-500 ease-out group-hover:text-white">
          {text ? text : children}
        </span>
      </button>
    );
  }
};

export default Button;
