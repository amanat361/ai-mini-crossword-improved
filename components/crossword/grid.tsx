"use client";

import React, { useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CrosswordCell from "./cell";
import useCrosswordPuzzle from "@/hooks/useCrosswordPuzzle";
import type { CrosswordPuzzle } from "@/hooks/useCrosswordPuzzle";
import CrosswordClue from "./clue";
import { ScrollArea } from "../ui/scroll-area";

function Crossword({ initialPuzzle}: { initialPuzzle: CrosswordPuzzle }) {
  const {
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
  } = useCrosswordPuzzle(initialPuzzle);

  const isCorrect = checkCorrectness();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        updateCell(e.key.toUpperCase());
        moveToNextCell();
      } else if (e.key === "Backspace") {
        updateCell("");
        moveToPreviousCell();
      } else if (e.key === "ArrowRight") {
        moveToNextCell();
      } else if (e.key === "ArrowLeft") {
        moveToPreviousCell();
      } else if (e.key === "ArrowDown") {
        moveDown();
      } else if (e.key === "ArrowUp") {
        moveUp();
      }
    },
    [updateCell, moveToNextCell, moveToPreviousCell, moveDown, moveUp]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleCheckPuzzle = () => {
    const isCorrect = checkCorrectness();
    console.log("Puzzle is correct:", isCorrect);
    console.log("Current puzzle state:", getCurrentPuzzleState());
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 max-w-6xl">
      <Card className={`transition-colors ${isCorrect ? "bg-green-100" : ""}`}>
        <CardHeader>
          <CardTitle>Crossword Puzzle</CardTitle>
          <CardDescription>
            A simple crossword puzzle game built with Next.js and Tailwind CSS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <CrosswordCell
                  key={`${rowIndex}-${colIndex}`}
                  value={cell}
                  isSelected={
                    rowIndex === selectedCell.row &&
                    colIndex === selectedCell.col
                  }
                  onClick={() =>
                    setSelectedCell({ row: rowIndex, col: colIndex })
                  }
                />
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={resetPuzzle}>Reset Puzzle</Button>
          {/* <Button onClick={handleCheckPuzzle}>Check Puzzle</Button> */}
          <Button onClick={solvePuzzle}>Solve Puzzle</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Clues</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <CardContent>
            <div className="flex flex-col gap-2">
              <CardDescription>Across</CardDescription>
              {puzzle.clues
                .filter((clue) => clue.direction === "across")
                .map((clue, index) => (
                  <CrosswordClue key={index} clue={clue} />
                ))}
              <CardDescription>Down</CardDescription>
              {puzzle.clues
                .filter((clue) => clue.direction === "down")
                .map((clue, index) => (
                  <CrosswordClue key={index} clue={clue} />
                ))}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Crossword;
