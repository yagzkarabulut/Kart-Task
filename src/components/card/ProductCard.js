import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import CardImage from "./CardImage";
import CardDetails from "./CardDetails";
import useStore from "../../store/cardStore";

const ProductCard = ({ card }) => {
  const { selectedCards, selectCard, winner, showResult } = useStore();
  const isSelected = selectedCards.includes(card.id);
  const isWinner = showResult && winner === card.id;
  const isDraw =
    showResult && winner === "draw" && selectedCards.includes(card.id);

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      sx={{ maxWidth: 270, width: "100%" }}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03, y: -8 }}
        whileTap={{ scale: 0.97 }}
        style={{ height: "100%" }}
      >
        <Card
          sx={{
            height: "100%",
            cursor: "pointer",
            border: isSelected ? "3px solid #1976d2" : "1px solid #e0e0e0",
            backgroundColor: isSelected ? "#f3f8ff" : "white",
            position: "relative",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              boxShadow: 4,
            },
            ...(isWinner && {
              border: "3px solid #4caf50",
              boxShadow: "0 0 20px rgba(76, 175, 80, 0.3)",
            }),
            ...(isDraw && {
              border: "3px solid #ff9800",
              boxShadow: "0 0 20px rgba(255, 152, 0, 0.3)",
            }),
          }}
          onClick={() => selectCard(card.id)}
        >
          <CardImage card={card} isWinner={isWinner} isDraw={isDraw} />
          <CardDetails card={card} />
        </Card>
      </motion.div>
    </Grid>
  );
};

export default ProductCard;
