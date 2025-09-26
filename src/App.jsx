import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { gameTheme } from "./theme.js";
import TopBar from "./components/TopBar.jsx";
import Arena from "./components/Arena.jsx";
import CardGrid from "./components/CardGrid.jsx";

export default function App() {
  return (
    <ThemeProvider theme={gameTheme}>
      <CssBaseline />
      <TopBar />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Arena />
        <CardGrid />
      </Container>
    </ThemeProvider>
  );
}
