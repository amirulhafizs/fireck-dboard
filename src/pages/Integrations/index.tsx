import PageTitle from "components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import Button from "components/Button";
import { confirm } from "components/Confirm";
import { useEffect } from "react";
import { getAllIntegrations, updateIntegration } from "api/integrations";
import { useHistory } from "react-router-dom";

export interface IntegrationsProps {}

const Integrations: React.FC<IntegrationsProps> = () => {
  const integrations = useSelector((state: RootState) => state.integrations);
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleInstall = (id: string, installed: boolean) => {
    dispatch({ type: "UPDATE_INTEGRATION", id, payload: { installed } });
    updateIntegration(id, { installed });
  };

  return (
    <div>
      <PageTitle className="mb-12">Integrations</PageTitle>
      {integrations.map((x, i) => (
        <div className="rounded-md bg-gray-300 p-7 flex justify-between items-center mb-3">
          <div>
            <div className="text-lg font-medium mb-2">{x.title}</div>
            <div className="text-sm max-w-xs">{x.description}</div>
          </div>
          {x.installed ? (
            <div className="flex">
              <Button
                onClick={() => history.push(`/integrations/${x.id}`)}
                noMinWidth
                className="bg-orange-300 hover:bg-orange-301 mr-4 w-140px"
              >
                Configure
              </Button>
              <Button
                noMinWidth
                className="bg-blue-300 hover:bg-blue-400 text-white w-140px"
                onClick={async () => {
                  const res = await confirm({
                    confirmation:
                      "Do you really want to uninstall integration? Configuration may be lost.",
                  });
                  if (res) {
                    toggleInstall(x.id, false);
                  }
                }}
              >
                Uninstall
              </Button>
            </div>
          ) : (
            <Button
              noMinWidth
              className="bg-orange-300 hover:bg-orange-301 w-140px"
              onClick={() => toggleInstall(x.id, true)}
            >
              Install
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Integrations;
