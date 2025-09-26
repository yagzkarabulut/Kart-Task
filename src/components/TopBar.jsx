import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Box,
} from "@mui/material";
import { useStore } from "../store.js";

const metrics = [
  { value: "power", label: "⚔️ Power" },
  { value: "speed", label: "💨 Speed" },
  { value: "hp", label: "❤️ HP" },
];

export default function TopBar() {
  const { selected, metric, reverse, reset } = useStore();

  return (
    <AppBar
      position="sticky"
      sx={{ background: "linear-gradient(90deg,#ff0266,#ff512f)" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" fontWeight={900}>
          Karakter Arenası
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <ToggleButtonGroup
            value={metric}
            exclusive
            onChange={(_, v) => v && useStore.getState().setMetric(v)}
          >
            {metrics.map((m) => (
              <ToggleButton key={m.value} value={m.value}>
                {m.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <ToggleButton
            value="reverse"
            selected={reverse}
            onChange={() => useStore.getState().setReverse(!reverse)}
          >
            Düşük Kazanır
          </ToggleButton>

          {/* <Button
            variant="contained"
            disabled={selected.length !== 2}
            onClick={() => window.dispatchEvent(new Event("run-compare"))}
          >
            Karşılaştır
          </Button> */}

          <Button
            variant="outlined"
            onClick={reset}
            sx={{ color: "#fff", borderColor: "#fff" }}
          >
            Sıfırla
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
