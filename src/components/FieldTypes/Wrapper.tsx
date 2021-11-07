interface WrapperProps {}

const Wrapper: React.FC<WrapperProps> = (props) => {
  return (
    <div
      {...props}
      className="w-8 rounded h-5 bg-fireck-4 text-center flex justify-center items-center text-10px font-medium"
    ></div>
  );
};

export default Wrapper;
