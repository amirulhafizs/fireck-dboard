export interface ToupleInputProps extends React.HTMLAttributes<HTMLDivElement> {
  setValue: (a: any) => void;
  options: {
    value: any;
    label: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
  value: any;
  disabled?: boolean;
}

const ToupleInput: React.FC<ToupleInputProps> = ({
  className = "",
  options,
  value,
  setValue,
  disabled,
  ...rest
}) => {
  return (
    <div className={"flex -mx-2 flex-wrap sm:flex-nowrap mb-10 " + className} {...rest}>
      {options.map((opt, i) => (
        <div
          data-testid={`touple-option-${opt.value}`}
          key={opt.value}
          onClick={() => setValue(opt.value)}
          className={`sm:w-1/2 w-full mx-2 mb-3 sm:mb-0 py-7 select-none ${
            disabled ? "cursor-default" : "cursor-pointer"
          } flex items-center justify-center rounded ${
            value === opt.value
              ? "border-4 border-orange-300"
              : `bg-gray-300 ${disabled ? "" : "hover:bg-gray-301"}`
          }`}
        >
          <div className="flex items-center pointer-events-none">
            <div className={opt.icon ? "mr-7" : ""}>{opt.label}</div>
            {opt.icon ? <opt.icon></opt.icon> : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToupleInput;
