export type IconButtonVariant = "transparent" | "standard";

export interface IconButtonProps {
  className?: string;
  variant?: IconButtonVariant;
  [x: string]: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  className = "",
  variant = "standard",
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={
        `bg-fireck-4 hover:bg-fireck-4-hover h-5 w-5 rounded flex items-center justify-center transition cursor-pointer ` +
        className
      }
    ></div>
  );
};

export default IconButton;
