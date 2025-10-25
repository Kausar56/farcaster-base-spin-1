import React, { ReactNode } from "react";

type ButtonPros = {
  children: ReactNode;
  onClick?: () => void;
};

const Button = (props: ButtonPros) => {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex gap-2 items-center"
    >
      {children}
    </button>
  );
};

export default Button;
