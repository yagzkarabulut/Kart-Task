import { motion } from "framer-motion";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useStore from "../store/cardStore";

const WinnerBanner = () => {
  const { winner, showResult, selectedCards, metric, cards } = useStore();
  if (!showResult) return null;

  const isDraw = winner === "draw";
  const winnerCard = isDraw ? null : cards.find((card) => card.id === winner);
  const selectedCardNames = selectedCards.map(
    (id) => cards.find((card) => card.id === id)?.name
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <Paper
        sx={{
          p: 3,
          m: 3,
          textAlign: "center",
          backgroundColor: isDraw ? "#fff3e0" : "#e8f5e8",
          border: `2px solid ${isDraw ? "#ff9800" : "#4caf50"}`,
        }}
        elevation={3}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          {isDraw ? "Beraberlik" : `Kazanan : ${winnerCard?.name}`}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {isDraw
            ? `${selectedCardNames.join(" vs ")} - ${metric} değerinde eşitlik`
            : `${metric} metriğinde en iyi performans`}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default WinnerBanner;
