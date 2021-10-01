import Button from "components/Button";
import useUpdateAvailable from "hooks/useUpdateAvailable";

export interface UpdateAppWidgetProps {}

const UpdateAppWidget: React.FC<UpdateAppWidgetProps> = () => {
  const { updateAvailable, gitName, gitRepo } = useUpdateAvailable();

  return !updateAvailable ? null : (
    <div className="pb-3">
      <div className="mb-2 text-white text-sm">New version available</div>
      <Button
        className="bg-orange-300 hover:bg-orange-301"
        onClick={() =>
          (window.location.href = `https://fireck.com/update?gitName=${gitName}&gitRepo=${gitRepo}&appUrl=${window.location.origin}`)
        }
      >
        Update App
      </Button>
    </div>
  );
};

export default UpdateAppWidget;
