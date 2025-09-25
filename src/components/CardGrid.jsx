import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Snackbar,
  Alert,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useStore } from "../store.js";

const rarities = ["All", "Common", "Rare", "Epic", "Legendary"];

export default function CardGrid() {
  const {
    filteredChars,
    selected,
    toggleSelect,
    rarity,
    setRarity,
    sort,
    order,
    setSort,
    snack,
    closeSnack,
  } = useStore();

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Rarity</InputLabel>
          <Select value={rarity} onChange={(e) => setRarity(e.target.value)}>
            {rarities.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={`${sort}-${order}`}
          exclusive
          onChange={(_, v) => {
            if (!v) return;
            const [key, ord] = v.split("-");
            setSort(key, ord);
          }}
          size="small"
        >
          <ToggleButton value="power-desc">Power ↓</ToggleButton>
          <ToggleButton value="speed-desc">Speed ↓</ToggleButton>
          <ToggleButton value="hp-desc">HP ↓</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Grid container spacing={3} justifyContent="center">
        {filteredChars().map((ch) => {
          const isSelected = selected.includes(ch.id);
          return (
            <Grid item key={ch.id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => toggleSelect(ch.id)}
                  sx={{
                    width: 160,
                    height: 220,
                    cursor: "pointer",
                    background: isSelected
                      ? "linear-gradient(145deg,#90caf9,#1976d2)"
                      : "linear-gradient(145deg,#1e1e1e,#121212)",
                    border: isSelected ? "3px solid #90caf9" : "2px solid #444",
                    boxShadow: isSelected
                      ? "0 8px 32px rgba(144,202,249,.8)"
                      : 4,
                    color: "#fff",
                  }}
                >
                  <CardContent sx={{ textAlign: "center", pt: 3 }}>
                    <Typography variant="h3">{ch.avatar}</Typography>
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      {ch.name}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      sx={{ mt: 2 }}
                    >
                      <Chip label={`⚔️ ${ch.power}`} size="small" />
                      <Chip label={`💨 ${ch.speed}`} size="small" />
                      <Chip label={`❤️ ${ch.hp}`} size="small" />
                    </Stack>
                    <Chip
                      label={ch.rarity}
                      size="small"
                      color={ch.rarity === "Legendary" ? "warning" : "default"}
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={closeSnack}>
          {snack}
        </Alert>
      </Snackbar>
    </Box>
  );
}
