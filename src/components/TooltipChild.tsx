import { forwardRef } from "react";

const TooltipChild = forwardRef(function MyComponent(props: any, ref: any) {
  return <div {...props} ref={ref}></div>;
});

export default TooltipChild;
