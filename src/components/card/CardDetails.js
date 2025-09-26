import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMetric from "./CardMetric";

const CardDetails = ({ card }) => {
  return (
    <CardContent>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
      >
        {card.name}
      </Typography>
      <Typography
        color="text.secondary"
        gutterBottom
        sx={{ textTransform: "capitalize" }}
      >
        {card.category}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 1, gap: 0.5 }}>
        <CardMetric label="Fiyat" value={`$${card.price}`} />
        <CardMetric label="Rating" value={`${card.rating}/5`} />
        <CardMetric label="Hız" value={`${card.speed}/100`} />
      </Box>
    </CardContent>
  );
};

export default CardDetails;
