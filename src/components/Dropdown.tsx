import React from "react";

export interface DropdownProps {
  children: any;
  content: any;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, content, className = "" }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={"relative self-start select-none " + className}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div>{children}</div>
      {open ? <div className="absolute top-full shadow w-full">{content}</div> : null}
    </div>
  );
};

export default Dropdown;
