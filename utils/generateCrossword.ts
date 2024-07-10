import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const presetPuzzle = {
  words: [
    "APPLE",
    "BEACH",
    "CLOUD",
    "DREAM",
    "EAGLE", // Across words
    "ABCDE",
    "PELRA",
    "PAOEG",
    "LCUAL",
    "EHDME", // Down words
  ],
};

export const generatePuzzle = async () => {
  const { object } = await generateObject({
    model: openai("gpt-4o-2024-05-13"),
    schema: z.object({
      clues: z
        .array(
          z.object({
            direction: z.enum(["across", "down"]),
            number: z.number().int().min(1).max(5),
            text: z
              .string()
              .describe(
                "A sentence describing the word or explaining why it's not a real word."
              ),
          })
        )
        .length(10),
    }),
    prompt: `Generate clues for the following 5x5 crossword puzzle words:

Across:
1. APPLE
2. BEACH
3. CLOUD
4. DREAM
5. EAGLE

Down:
1. ABCDE
2. PLEAD
3. PEACE
4. LOHRE
5. EEDGE

Rules for creating clues:
1. For real words, provide a standard, creative crossword clue.
2. For non-words (like ABCDE, LOHRE, EEDGE), use a clue like: "This isn't a real word. It's formed by letters from across words."
3. Clues should be challenging but fair, suitable for a moderate difficulty crossword puzzle.
4. Do not use the word itself or any part of it in the clue.
5. Number the clues from 1 to 5 for both 'across' and 'down' directions.

Provide exactly 10 clues, one for each word, in the specified format.`,
  });

  return {
    ...presetPuzzle,
    clues: object.clues,
  };
};
