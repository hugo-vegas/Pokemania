import { z } from "zod";

export const regionNames = [
  'Kanto',
  'Johto',
  'Hoenn',
  'Sinnoh',
  'Unova',
  'Kalos',
  'Alola',
  'Galar',
  'Paldea',
  'General'
] as const;

export const difficultyLevels = ['easy', 'medium', 'hard', 'expert'] as const;

export const regionSchema = z.enum(regionNames);
export const difficultySchema = z.enum(difficultyLevels);

export const pokemonSchema = z.object({
  number: z.number(),
  name: z.string(),
  types: z.array(z.string()),
  image_url: z.string(),
});

export const questionRequestSchema = z.object({
  region: regionSchema,
  difficulty: difficultySchema,
});

export const questionResponseSchema = z.object({
  pokemon_id: z.number(),
  image_url: z.string(),
});

export const answerRequestSchema = z.object({
  pokemon_id: z.number(),
  answer: z.string(),
  difficulty: difficultySchema,
});

export const answerResponseSchema = z.object({
  correct: z.boolean(),
  feedback: z.string(),
  pokemon: pokemonSchema,
});

export type Region = z.infer<typeof regionSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type Pokemon = z.infer<typeof pokemonSchema>;
export type QuestionRequest = z.infer<typeof questionRequestSchema>;
export type QuestionResponse = z.infer<typeof questionResponseSchema>;
export type AnswerRequest = z.infer<typeof answerRequestSchema>;
export type AnswerResponse = z.infer<typeof answerResponseSchema>;

export const regionRanges: Record<Region, { min: number; max: number }> = {
  'Kanto': { min: 1, max: 151 },
  'Johto': { min: 152, max: 251 },
  'Hoenn': { min: 252, max: 386 },
  'Sinnoh': { min: 387, max: 493 },
  'Unova': { min: 494, max: 649 },
  'Kalos': { min: 650, max: 721 },
  'Alola': { min: 722, max: 809 },
  'Galar': { min: 810, max: 905 },
  'Paldea': { min: 906, max: 1025 },
  'General': { min: 1, max: 1025 }
};

export const regionRepresentatives: Record<Region, string> = {
  'Kanto': 'Charizard',
  'Johto': 'Lugia',
  'Hoenn': 'Rayquaza',
  'Sinnoh': 'Dialga',
  'Unova': 'Reshiram',
  'Kalos': 'Xerneas',
  'Alola': 'Solgaleo',
  'Galar': 'Zacian',
  'Paldea': 'Koraidon',
  'General': 'Pikachu'
};

export const difficultyDescriptions: Record<Difficulty, string> = {
  'easy': '¿Cuál es el nombre de este Pokémon?',
  'medium': '¿Cuál es el tipo de este Pokémon?',
  'hard': '¿Cuál es el número de Pokédex de este Pokémon?',
  'expert': 'Escribe el número, tipo y nombre del Pokémon'
};

export const difficultyPlaceholders: Record<Difficulty, string> = {
  'easy': 'Ej: Pikachu',
  'medium': 'Ej: Electric',
  'hard': 'Ej: 25',
  'expert': 'Número, Tipo, Nombre'
};
