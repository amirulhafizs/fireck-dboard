import Button from "components/Button";

export interface EmptyScreenProps {
  title: string;
  buttonTitle: string;
  onCreate: () => void;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ title, onCreate, buttonTitle }) => {
  return (
    <div className="h-96 bg-fireck-3 rounded-md flex w-full p-12">
      <div className="m-auto">
        <div className="text-22px mb-5 font-medium text-center text-white">{title}</div>
        <Button
          data-testid="empty-screen-btn"
          className="mx-auto bg-fireck-4 hover:bg-fireck-4-hover h-34px block"
          onClick={onCreate}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default EmptyScreen;
