import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

const CardsGrid = ({ cards }) => {
  if (cards.length === 0) {
    return (
      <Paper sx={{ p: 6, mt: 2, textAlign: "center" }} elevation={1}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Hiç kart bulunamadı
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Filtre ayarlarınızı kontrol edin
        </Typography>
      </Paper>
    );
  }
  return (
    <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
      <AnimatePresence>
        {cards.map((card) => (
          <ProductCard key={card.id} card={card} />
        ))}
      </AnimatePresence>
    </Grid>
  );
};

export default CardsGrid;
