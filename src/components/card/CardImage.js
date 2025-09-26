import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import { AnimatePresence, motion } from "framer-motion";

const CardImage = ({ card, isWinner, isDraw }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <AnimatePresence>
        {(isWinner || isDraw) && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            style={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
          >
            <Chip
              label={isDraw ? "DRAW" : "WINNER"}
              color={isDraw ? "warning" : "success"}
              size="small"
              sx={{ fontWeight: "bold" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          isWinner
            ? {
                scale: [1, 1.02, 1],
                filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
              }
            : {}
        }
        transition={{ duration: 1, repeat: isWinner ? Infinity : 0 }}
      >
        <CardMedia
          component="img"
          height="200"
          image={card.image}
          alt={card.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/300x200/1976d2/fff?text=${encodeURIComponent(
              card.name
            )}`;
          }}
        />
      </motion.div>
    </Box>
  );
};

export default CardImage;
