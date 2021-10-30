import Button from "components/Button";

export interface EmptyScreenProps {
  title: string;
  buttonTitle: string;
  onCreate: () => void;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ title, onCreate, buttonTitle }) => {
  return (
    <div className="h-96 bg-gray-300 rounded-md flex w-full p-12">
      <div className="m-auto">
        <div className="text-22px mb-5 font-medium text-center">{title}</div>
        <Button
          data-testid="empty-screen-btn"
          className="mx-auto bg-orange-300 hover:bg-orange-301 block"
          onClick={onCreate}
        >
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

export default EmptyScreen;
