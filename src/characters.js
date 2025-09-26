// Rastgele isim + emoji havuzu
const names = [
  "Void Reaper",
  "Thunder Wyrm",
  "Frost Phantom",
  "Blaze Paladin",
  "Storm Caller",
  "Crystal Golem",
  "Night Shade",
  "Solar Phoenix",
  "Iron Berserker",
  "Mystic Owl",
  "Plasma Wolf",
  "Cyber Serpent",
  "Lava Titan",
  "Mirror Assassin",
  "Nova Fairy",
  "Ghost Rider",
  "Radiant Dragon",
  "Shadow Ranger",
  "Quantum Fox",
  "Neon Tiger",
];
const avatars = [
  "👻",
  "🌩️",
  "❄️",
  "🔥",
  "🌪️",
  "💎",
  "🦉",
  "🦊",
  "🐺",
  "🐉",
  "🦾",
  "🪞",
  "🧬",
  "⚡",
  "✨",
  "🌞",
  "🌌",
  "🎯",
  "🔮",
  "🥷",
];

export const characters = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: names[i],
  avatar: avatars[i],
  power: Math.floor(Math.random() * 40) + 60, // 60-100
  speed: Math.floor(Math.random() * 40) + 60, // 60-100
  hp: Math.floor(Math.random() * 500) + 700, // 700-1200
  rarity: ["Common", "Rare", "Epic", "Legendary"][
    Math.floor(Math.random() * 4)
  ],
}));
