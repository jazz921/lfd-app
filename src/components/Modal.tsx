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
  entrance?: "slideLeft" | "slideRight" | "fadeIn";
}

const Modal = ({
  position = "center",
  open,
  close,
  fullHeight,
  fullWidth,
  children,
  entrance,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(open);
  const [animate, setAnimate] = useState("animate-fade-in");

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

  const handleAnimate = () => {
    switch (entrance) {
      case "slideLeft":
        return "animate-slide-left";
      case "slideRight":
        return "animate-slide-right";
      case "fadeIn":
      default:
        return "animate-fade-in";
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
  TODO: Handle exit animation gracefully 
  -Currently the Modal instantly disappear when it is closed => handle the exit Properly
  */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setShow(true);
      setAnimate(handleAnimate());
    } else {
      document.body.style.overflow = "";
      setShow(false);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!show || !mounted) return null;

  return createPortal(
    <div
      className={`overlay fixed inset-0 bg-black/50 flex ${handleContentPosition(
        position
      )}`}
      onClick={close}
    >
      <div
        className={`bg-white rounded-xs shadow-lg z-50 ${animate} ${
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
