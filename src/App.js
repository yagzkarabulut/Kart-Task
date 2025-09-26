import Box from "@mui/material/Box";
import HeaderBar from "./components/HeaderBar";
import Container from "@mui/material/Container";
import { AnimatePresence } from "framer-motion";
import FilterPanel from "./components/FilterPanel";
import JsonUploadPanel from "./components/JsonUploadPanel";
import SelectionStatus from "./components/SelectionStatus";
import CardsGrid from "./components/card/CardsGrid";
import CustomSnackbar from "./components/CustomSnackbar";
import WinnerBanner from "./components/WinnerBanner";
import useStore from "./store/cardStore";
import useFilteredCards from "./hooks/useFilteredCards";

const App = () => {
  const { showResult, isOpen } = useStore();
  const filteredAndSortedCards = useFilteredCards();

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh", background: "#f5f5f5" }}>
      <HeaderBar />
      <Container>
        <AnimatePresence>{showResult && <WinnerBanner />}</AnimatePresence>
        <FilterPanel />
        <AnimatePresence>{isOpen && <JsonUploadPanel />}</AnimatePresence>

        <SelectionStatus />
        <CardsGrid cards={filteredAndSortedCards} />
      </Container>
      <CustomSnackbar />
    </Box>
  );
};

export default App;
