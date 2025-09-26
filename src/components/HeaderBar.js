import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useStore from "../store/cardStore";

const HeaderBar = () => {
  const {
    metric,
    selectedCards,
    setMetric,
    togglePanel,
    compareCards,
    resetComparison,
  } = useStore();

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          Kart Karşılaştırma Uygulaması
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            m: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel
              sx={{ color: "white", "&.Mui-focused": { color: "white" } }}
            >
              Metrik
            </InputLabel>
            <Select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              label="Metrik"
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="price">Fiyat</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="speed">Hız</MenuItem>
            </Select>
          </FormControl>

          <Button
            color="success"
            variant="contained"
            onClick={compareCards}
            disabled={selectedCards.length !== 2}
            sx={{ fontWeight: "bold" }}
          >
            Karşılaştır
          </Button>
          <Button
            variant="outlined"
            onClick={resetComparison}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Sıfırla
          </Button>
          <Button
            variant="outlined"
            onClick={togglePanel}
            sx={{
              color: "white",
              borderColor: "rgba(255,255,255,0.5)",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Yeni Ürün Ekle
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
