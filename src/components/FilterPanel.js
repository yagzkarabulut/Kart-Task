import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useStore from "../store/cardStore";

const FilterPanel = () => {
  const {
    filter,
    sortBy,
    sortOrder,
    setFilter,
    setSortBy,
    setSortOrder,
    cards,
  } = useStore();
  const categories = [...new Set(cards.map((card) => card.category))];
  return (
    <Paper sx={{ p: 3, mt: 2, mb: 2 }} elevation={2}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Filtreler ve Sıralama
      </Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Kategori</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Kategori"
          >
            <MenuItem value="all">Tümü</MenuItem>
            {categories.map((cat) => (
              <MenuItem
                key={cat}
                value={cat}
                sx={{ textTransform: "capitalize" }}
              >
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sırala</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label="Sırala"
          >
            <MenuItem value="price">Fiyat</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="speed">Hız</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sıra</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Sıra"
          >
            <MenuItem value="asc">Artan</MenuItem>
            <MenuItem value="desc">Azalan</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
