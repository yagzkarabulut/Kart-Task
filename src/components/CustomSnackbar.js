import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useStore from "../store/cardStore";

const CustomSnackbar = () => {
  const { snackbar, closeSnackbar } = useStore();
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={snackbar.severity}
        onClose={closeSnackbar}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
