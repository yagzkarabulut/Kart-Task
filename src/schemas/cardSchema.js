import z from "zod";

export const CardSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  rating: z.number().min(0).max(5),
  speed: z.number(),
  category: z.string(),
});

export const CardsArraySchema = z.array(CardSchema);
