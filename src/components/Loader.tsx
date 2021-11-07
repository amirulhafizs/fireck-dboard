type size = "tiny" | "small" | "normal" | "large";

export interface LoaderProps {
  className?: string;
  size?: size;
}

const Loader: React.FC<LoaderProps> = ({ className = "", size = "normal" }) => {
  const sizes = {
    normal: 50,
    small: 40,
    tiny: 30,
    large: 70,
  };
  return (
    <div className={`loader ` + className} style={{ width: sizes[size] }}>
      <svg className="loader-circular" viewBox="25 25 50 50">
        <circle
          className="loader-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};

export default Loader;
