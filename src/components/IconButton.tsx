import ButtonBase from "@material-ui/core/ButtonBase";

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
    <ButtonBase
      {...rest}
      className={
        `outline-none h-26px w-26px rounded ${
          variant === "standard"
            ? "bg-orange-300 hover:bg-orange-301"
            : "hover:bg-black hover:bg-opacity-5"
        }  ` + className
      }
    ></ButtonBase>
  );
};

export default IconButton;
