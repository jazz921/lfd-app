"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  position?: "right" | "left" | "center";
  open?: boolean;
  close?: () => void;
  fullWidth?: boolean;
  fullHeight?: boolean;
  children?: React.ReactNode;
}

const Modal = ({
  position = "center",
  open,
  close,
  fullHeight,
  fullWidth,
  children,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleContentPosition = (pos: string) => {
    switch (pos) {
      case "right":
        return "justify-end items-center";
      case "left":
        return "justify-start items-center";
      default:
        return "justify-center items-center";
    }
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className={`overlay fixed inset-0 bg-black/50 flex ${handleContentPosition(
        position
      )}`}
      onClick={close}
    >
      <div
        className={`bg-white rounded-xs shadow-lg z-50 ${
          fullWidth ? "w-full" : "w-auto"
        } ${fullHeight ? "h-full" : "h-auto"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
