import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStore from "../store/cardStore";

const SelectionStatus = () => {
  const { selectedCards } = useStore();
  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Seçili Kartlar:
        <span style={{ color: "#1976d2" }}>{selectedCards.length}/2</span>
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 1, color: "text.secondary", minHeight: 30, display: "block" }}
      >
        {selectedCards.length === 0
          ? "Karşılaştırma için 2 kart seçin"
          : "\u00A0"}
      </Typography>
    </Box>
  );
};

export default SelectionStatus;
