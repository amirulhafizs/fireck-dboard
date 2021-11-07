import { SnackbarProvider, useSnackbar } from "notistack";

const NotificationsProvider = (props: any) => {
  return (
    <SnackbarProvider
      {...props}
      classes={{
        variantSuccess: "text-green-400 bg-white shadow-snack capitalize",
        variantError: "text-red-400 bg-white shadow-snack capitalize",
        variantWarning: "text-orange-400 bg-white shadow-snack capitalize",
        variantInfo: "text-blue-400 bg-white shadow-snack capitalize",
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    ></SnackbarProvider>
  );
};

export default NotificationsProvider;

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();
  const notify = enqueueSnackbar;
  return notify;
};
