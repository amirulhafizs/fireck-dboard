import Button from "components/Button";
import useUpdateAvailable from "hooks/useUpdateAvailable";

export interface UpdateAppWidgetProps {}

const UpdateAppWidget: React.FC<UpdateAppWidgetProps> = () => {
  const { updateAvailable, gitName, gitRepo } = useUpdateAvailable();

  return !updateAvailable ? null : (
    <div className="lg:flex items-center hidden">
      <div className="mr-3 text-white text-sm">New version available</div>
      <Button
        noMinWidth
        className="bg-fireck-4 hover:bg-fireck-4-hover h-6 rounded px-4 mr-3 text-black"
        onClick={() =>
          (window.location.href = `https://fireck.com/update?gitName=${gitName}&gitRepo=${gitRepo}&appUrl=${window.location.origin}`)
        }
      >
        Update
      </Button>
      <Button noMinWidth className="h-6 border-white border text-s rounded px-4 mr-3">
        Ignore
      </Button>
    </div>
  );
};

export default UpdateAppWidget;
