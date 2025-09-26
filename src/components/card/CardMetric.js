import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardMetric = ({ label, value }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2" color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
    </Box>
  );
};

export default CardMetric;
