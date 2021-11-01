import NavigationPrompt from "react-router-navigation-prompt";
import Confirm from "components/Confirm";
import { useSelector } from "react-redux";
import { RootState } from "store";

export interface RouteLeaveGuardProps {}

const RouteLeaveGuard: React.FC<RouteLeaveGuardProps> = () => {
  const documentChanged = useSelector((state: RootState) => state.documentChanged);
  return (
    <NavigationPrompt
      when={(currLocation, nextLocation) =>
        (currLocation.pathname.includes("/edit/") || currLocation.pathname.endsWith("/add")) &&
        documentChanged
      }
    >
      {({ isActive, onCancel, onConfirm }) => {
        if (isActive) {
          return (
            <Confirm
              confirmation="Leave page?"
              proceed={(val: any) => {
                if (val) {
                  onConfirm();
                  return;
                }
                onCancel();
              }}
            ></Confirm>
          );
        }
        return <div>This is probably an anti-pattern but ya know...</div>;
      }}
    </NavigationPrompt>
  );
};

export default RouteLeaveGuard;
