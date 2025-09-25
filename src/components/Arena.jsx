import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store.js";

export default function Arena() {
  const { selected, characters, winner, winnerId, metric, reverse } =
    useStore();

  const leftChar = characters.find((c) => c.id === selected[0]);
  const rightChar = characters.find((c) => c.id === selected[1]);

  // kazananı bul (store’daki winnerId ile karşılaştır)
  const leftWin = winner === "left";
  const rightWin = winner === "right";
  const draw = winner === "draw";

  // karşılaştırma sonucu metni
  const resultText = draw
    ? "⚖️ DRAW ⚖️"
    : `🏆 ${leftWin ? "LEFT" : "RIGHT"} WINS! 🏆`;

  // buton tıklandığında
  const handleCompare = () => {
    if (selected.length !== 2) return;
    const [a, b] = selected.map((id) => characters.find((c) => c.id === id));
    const res = compare(a, b, metric, reverse);
    const winId = res === "left" ? a.id : res === "right" ? b.id : null;
    useStore.getState().setWinner(res, winId);
  };

  // kart durumu: "win" | "lose" | "draw" | null
  const leftStatus = !winner ? null : draw ? "draw" : leftWin ? "win" : "lose";
  const rightStatus = !winner
    ? null
    : draw
    ? "draw"
    : rightWin
    ? "win"
    : "lose";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        p: 4,
        mx: "auto",
        maxWidth: 900,
        background: "linear-gradient(135deg, #1e1e1e 0%, #121212 100%)",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0,0,0,.5)",
        position: "relative",
      }}
    >
      {/* ÜST: Kartlar alanı */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          width: "100%",
          minHeight: 320,
        }}
      >
        {/* SOL KART */}
        <AnimatePresence mode="wait">
          {leftChar && (
            <motion.div
              key={leftChar.id}
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <BigCard character={leftChar} status={leftStatus} />
            </motion.div>
          )}
        </AnimatePresence>

        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: 700,
            textShadow: "0 0 12px #90caf9",
          }}
        >
          VS
        </Typography>

        {/* SAĞ KART */}
        <AnimatePresence mode="wait">
          {rightChar && (
            <motion.div
              key={rightChar.id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <BigCard character={rightChar} status={rightStatus} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boş slotlar */}
        {!leftChar && <EmptySlot text="1. kartı seç" />}
        {!rightChar && <EmptySlot text="2. kartı seç" />}
      </Box>

      {/* ALT: Sonuç banner + Karşılaştır butonu */}
      <Box sx={{ textAlign: "center", width: "100%" }}>
        {/* Sonuç yazısı */}
        <AnimatePresence>
          {winner && (
            <motion.div
              initial={{ y: -40, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: draw ? "#90caf9" : "#ffeb3b",
                  textShadow: draw
                    ? "0 0 12px #90caf9, 0 0 24px #90caf9"
                    : "0 0 12px #ffeb3b, 0 0 24px #ffeb3b",
                  letterSpacing: "2px",
                  mb: 2,
                }}
              >
                {resultText}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Karşılaştır butonu – Arena’nın altında */}
        <Button
          variant="contained"
          disabled={selected.length !== 2}
          onClick={handleCompare}
          sx={{ px: 4, py: 1.5, fontSize: 16 }}
        >
          Karşılaştır
        </Button>
      </Box>
    </Box>
  );
}

/* -------------- yardımcı bileşenler -------------- */
function BigCard({ character, status }) {
  const isWin = status === "win";
  const isDraw = status === "draw";
  const grad =
    isWin || isDraw
      ? "linear-gradient(145deg, #283593, #1976d2)"
      : "linear-gradient(145deg, #424242, #616161)";
  const shadow =
    isWin || isDraw
      ? "0 0 24px 8px rgba(255, 235, 59, .8)"
      : "0 6px 20px rgba(0,0,0,.4)";
  const scale = isWin || isDraw ? 1.05 : 1;
  const opacity = isWin || isDraw ? 1 : 0.65;

  // durum rozeti (WIN / LOSE / DRAW)
  const badgeText =
    status === "win" ? "🏆 WIN" : status === "lose" ? "❌ LOSE" : "⚖️ DRAW";

  return (
    <Card
      sx={{
        width: 220,
        height: 280,
        background: grad,
        color: "#fff",
        boxShadow: shadow,
        borderRadius: 3,
        transform: `scale(${scale})`,
        opacity,
        transition: "all 0.4s ease",
        position: "relative",
      }}
    >
      {/* Rozet – sağ üst */}
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 800,
            color: isWin || isDraw ? "#ffeb3b" : "#bdbdbd",
          }}
        >
          {badgeText}
        </Typography>
      </Box>

      <CardContent sx={{ textAlign: "center", pt: 3 }}>
        <Typography variant="h1">{character.avatar}</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          {character.name}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          ⚔️ Power: {character.power} <br />
          💨 Speed: {character.speed} <br />
          ❤️ HP: {character.hp}
        </Typography>
        {character.rarity === "Legendary" && (
          <Typography sx={{ fontSize: 12, color: "#ffeb3b", mt: 1 }}>
            Legendary
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

function EmptySlot({ text }) {
  return (
    <Card
      sx={{
        width: 220,
        height: 280,
        background: "rgba(255,255,255,0.08)",
        border: "2px dashed #555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#aaa",
        borderRadius: 3,
      }}
    >
      <Typography variant="h6">{text}</Typography>
    </Card>
  );
}

/* ------------ basit karşılaştırma fonksiyonu ------------ */
function compare(a, b, metric, reverse) {
  let va = a[metric];
  let vb = b[metric];
  if (reverse) [va, vb] = [vb, va]; // düşük kazanacaksa
  if (va > vb) return "left";
  if (vb > va) return "right";
  return "draw";
}
