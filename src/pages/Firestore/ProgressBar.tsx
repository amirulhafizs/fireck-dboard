import Loader from "components/Loader";

export interface ProgressBarProps {
  fractionValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ fractionValue }) => {
  return fractionValue === 1 ? (
    <div className="flex justify-end">
      <div>
        <Loader size="tiny"></Loader>
      </div>
    </div>
  ) : (
    <div className="rounded bg-gray-300 w-full overflow-hidden">
      <div
        style={{ width: `${fractionValue * 100}%` }}
        className="transition-all bg-blue-300 text-right h-34px pr-4 text-white leading-34px"
      >
        {fractionValue > 0.1 ? `${Math.round(fractionValue * 100)}%` : null}
      </div>
    </div>
  );
};

export default ProgressBar;
