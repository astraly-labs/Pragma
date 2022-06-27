import React from "react";
import classNames from "classnames";

interface StyledButtonProps {
  primary?: boolean;
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  primary,
  props,
  children,
}) => (
  // TODO: Discuss whether this should be button or div
  // Component also doesn't work.
  <button
    className={classNames(
      "flex cursor-pointer items-center rounded-lg bg-slate-700 px-4 py-3 text-slate-50 shadow-lg hover:bg-slate-800 hover:shadow-xl md:px-6 md:py-4 md:text-xl",
      { "bg-slate-700 text-slate-50 hover:bg-slate-800": primary },
      { "bg-slate-300 text-slate-700 hover:bg-slate-400": !primary }
    )}
    {...props}
  >
    {children}
  </button>
);
StyledButton.defaultProps = { primary: true };

export default StyledButton;
