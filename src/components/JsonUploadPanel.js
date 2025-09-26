import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import useStore from "../store/cardStore";
import { CardsArraySchema } from "../schemas/cardSchema";

const JsonUploadPanel = () => {
  const store = useStore();
  const { cards, setCards, showSnackbar, setPanelOpen } = store;
  const [jsonInput, setJsonInput] = React.useState("");
  const handleJsonUpload = () => {
    if (!jsonInput.trim()) {
      showSnackbar("Lütfen JSON verisi girin.", "warning");
      return;
    }
    try {
      const parsedJson = JSON.parse(jsonInput);
      if (!Array.isArray(parsedJson)) {
        showSnackbar("Yüklenen veri bir dizi (array) olmalı!", "error");
        return;
      }
      const validatedData = CardsArraySchema.parse(parsedJson);
      setCards([...cards, ...validatedData]);
      showSnackbar(
        `${validatedData.length} kart başarıyla eklendi!`,
        "success"
      );
      setJsonInput("");
      if (typeof setPanelOpen === "function") {
        setPanelOpen(false);
      }
    } catch (error) {
      if (error && error.errors && Array.isArray(error.errors)) {
        const errorMessages = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join(", ");
        showSnackbar(`Şema hatası: ${errorMessages}`, "error");
      } else {
        showSnackbar("Geçersiz JSON formatı!", "error");
      }
    }
  };
  return (
    <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        JSON Veri Yükle
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          multiline
          rows={4}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='[{"id": 13, "name": "Yeni Ürün", "image": "https://...", "price": 500, "rating": 4.0, "speed": 80, "category": "phone"}]'
          variant="outlined"
          fullWidth
        />
        <Box>
          <Button
            variant="contained"
            onClick={handleJsonUpload}
            sx={{ fontWeight: "bold" }}
          >
            Veri Yükle
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default JsonUploadPanel;
