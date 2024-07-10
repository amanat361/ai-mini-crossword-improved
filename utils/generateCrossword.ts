import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export const generatePuzzle = async () => {
  const { object } = await generateObject({
    model: openai("gpt-4o-2024-05-13"),
    schema: z.object({
      puzzle: z.object({
        words: z.array(z.string()).length(6).describe("The words of the crossword puzzle."),
        clues: z.array(
          z.object({
            direction: z.enum(["across", "down"]),
            number: z.number().int().min(1).max(3).describe("The number of the clue that increments by one."),
            text: z.string().describe("A sentence describing the word."),
          })
        ).length(6),
      }),
    }),
    prompt: "Generate a crossword puzzle. The puzzle is a 3 by 3 grid of letters. This mean that there must be 6 words total. The first three words are across and the next three words are down. The words should work with each other.",
  });

  return object.puzzle;
};
