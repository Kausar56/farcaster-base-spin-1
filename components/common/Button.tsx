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
      className="bg-indigo-500/50 text-white backdrop-blur-md shadow px-4 py-1 rounded-full my-3 text-sm flex items-center gap-1 fixed left-1/2 top-0 -translate-x-1/2 z-50 hover:shadow-md duration-300"
    >
      {children}
    </button>
  );
};

export default Button;
