import { z } from "zod";
export const cardSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    avatar: z.string().emoji(),
    power: z.number().int().min(1).max(100),
    speed: z.number().int().min(1).max(100),
    hp: z.number().int().min(100).max(10000),
    rarity: z.enum(["Common", "Rare", "Epic", "Legendary"]),
  })
);
