"use client";

import React from "react";

interface ButtonProps {
  click?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  text?: string;
  variant?: "text" | "contained" | "outlined";
}

const Button = ({ children, click, disabled, text, variant = "outlined" }: ButtonProps) => {
  const handleClick = () => {
    if (click) {
      click();
    }
  };

  if (variant === "contained") {
    <button>

    </button>
  }

  if (variant === "text") {
    <button>
      
    </button>
  }
 
  return (
    <button onClick={handleClick} className="group relative p-[8px] border-2 border-black overflow-hidden cursor-pointer transition-text duration-500 ease-out hover:border-sky-blue">
      <div className="absolute inset-0 bg-sky-blue z-0 translate-x-[-100%] transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
      <span className="relative z-10 transition-text duration-500 ease-out group-hover:text-white">
        {children}
      </span>
    </button>
  );
};

export default Button;
