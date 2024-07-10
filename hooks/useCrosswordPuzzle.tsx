// hooks/useCrosswordPuzzle.ts
import { useState, useCallback } from "react";
import useCrosswordGrid from "./useCrosswordGrid";
import { gridToWords, wordsToGrid } from "@/utils/gridWordConversion";

export interface Clue {
  direction: "across" | "down";
  number: number;
  text: string;
}

export interface CrosswordPuzzle {
  words: string[];
  clues: Clue[];
}

const createEmptyGrid = (rows: number, cols: number): string[][] =>
  Array(rows).fill(Array(cols).fill(""));

const useCrosswordPuzzle = (initialPuzzle: CrosswordPuzzle) => {
  const [puzzle, setPuzzle] = useState<CrosswordPuzzle>(initialPuzzle);
  const rows = Math.ceil(initialPuzzle.words.length / 2);
  const cols = initialPuzzle.words[0].length;

  const {
    grid,
    selectedCell,
    setSelectedCell,
    updateCell,
    moveToNextCell,
    moveToPreviousCell,
    moveDown,
    moveUp,
    getCurrentState: getGridState,
    setGridState,
  } = useCrosswordGrid(
    rows,
    cols,
    createEmptyGrid(rows, cols)
  );

  const getCurrentPuzzleState = useCallback(() => {
    const currentGrid = getGridState();
    const currentWords = gridToWords(currentGrid);
    return {
      words: currentWords,
      clues: puzzle.clues,
    };
  }, [getGridState, puzzle.clues]);

  const checkCorrectness = useCallback(() => {
    const currentState = getCurrentPuzzleState();
    const correct = currentState.words.every(
      (word, index) => word === puzzle.words[index]
    );
    return correct;
  }, [getCurrentPuzzleState, puzzle.words]);

  const solvePuzzle = useCallback(() => {
    const currentState = getCurrentPuzzleState();
    const solution = currentState.words.map((word, index) =>
      puzzle.words[index]
    );
    setGridState(wordsToGrid(solution, rows, cols));
  }, [getCurrentPuzzleState, puzzle.words, setGridState, rows, cols]);

  const resetPuzzle = useCallback(() => {
    setGridState(createEmptyGrid(rows, cols));
  }, [setGridState, rows, cols]);

  return {
    puzzle,
    grid,
    selectedCell,
    setSelectedCell,
    updateCell,
    moveToNextCell,
    moveToPreviousCell,
    moveDown,
    moveUp,
    getCurrentPuzzleState,
    checkCorrectness,
    solvePuzzle,
    resetPuzzle,
    setGridState,
  };
};

export default useCrosswordPuzzle;
