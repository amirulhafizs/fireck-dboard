import Button from "components/Button";
import PageTitle from "components/PageTitle";
import Input from "components/Input";
import { updateIntegration, getIntegration } from "api/integrations";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useEffect, useState } from "react";
import classNames from "classnames";

export interface PaymentsProps {}

const Payments: React.FC<PaymentsProps> = () => {
  const integration = useSelector((state: RootState) =>
    state.integrations.find((x) => x.id === "payments")
  );
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getIntegration("payments");
        dispatch({ type: "UPDATE_INTEGRATION", payload: res, id: "payments" });
        setCurrentKey(res.stripe_secret_key);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const changed = integration && currentKey !== integration.stripe_secret_key;

  return !integration ? null : (
    <div>
      <div className="flex justify-between flex-wrap mb-7">
        <PageTitle className="mb-4 mr-4">Payments</PageTitle>

        <Button
          onClick={() => {
            const { stripe_secret_key } = integration;
            updateIntegration("payments", { stripe_secret_key });
            setCurrentKey(integration.stripe_secret_key);
          }}
          disabled={!changed}
          className={classNames("mb-4 w-140px", {
            "bg-orange-300 hover:bg-orange-301": changed,
            "bg-gray-300 text-gray-500 cursor-default": !changed,
          })}
          noMinWidth
        >
          {currentKey === integration.stripe_secret_key ? "Saved!" : "Save"}
        </Button>
      </div>
      <div className="max-w-xl mb-12">
        To use payments integration, you need to have or create a stripe account. To setup stripe
        payments enter your <span className="font-semibold">stripe secret key</span> down below and
        save it. After that give some time for the app to rebuild with new environment variables.
      </div>
      <div className="max-w-xl">
        <div className="mb-2">Stripe secret key</div>
        <Input
          value={integration.stripe_secret_key}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_INTEGRATION",
              id: "payments",
              payload: { stripe_secret_key: e.target.value },
            })
          }
        ></Input>
      </div>
    </div>
  );
};

export default Payments;
