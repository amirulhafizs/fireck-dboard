import classNames from "classnames";

export interface PageTitleProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const PageTitle: React.FC<PageTitleProps> = ({ className, ...rest }) => {
  return (
    <div
      {...rest}
      className={classNames("text-34px font-medium capitalize leading-none", className)}
    ></div>
  );
};

export default PageTitle;
