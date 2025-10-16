import React from "react";
import withAnimation from "@/utils/hoc/withAnimation";

interface AnimateComponentProps {
  children: React.ReactNode;
}

const AnimateComponent = ({ children }: AnimateComponentProps) => {
  
  const toBeAnimate = () => <React.Fragment>{children}</React.Fragment>;

  const Animate = withAnimation(toBeAnimate);

  return <Animate />;
};

export default AnimateComponent;
