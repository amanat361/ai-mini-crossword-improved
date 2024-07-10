"use client";

import React, { useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CrosswordCell from "./cell";
import useCrosswordGrid from "@/hooks/useCrosswordGrid";

const Crossword: React.FC = () => {
  const {
    grid,
    selectedCell,
    setSelectedCell,
    updateCell,
    moveToNextCell,
    moveToPreviousCell,
    moveDown,
    moveUp,
    getCurrentState,
    setGridState,
  } = useCrosswordGrid(3, 3);

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

  const handleSave = () => {
    const currentState = getCurrentState();
    console.log("Current Crossword State:", currentState);
    // Here you can save the state to localStorage, send to a server, etc.
  };

  const handleLoad = () => {
    // Example of loading a predefined state
    const savedState = [
      ["A", "B", "C"],
      ["D", "E", "F"],
      ["G", "H", "I"],
    ];
    setGridState(savedState);
  };

  return (
    <Card className="p-4 w-full max-w-md">
      <CardHeader>
        <CardTitle>Crossword Puzzle</CardTitle>
        <CardDescription>A simple crossword puzzle game built with Next.js and Tailwind CSS.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <CrosswordCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                isSelected={
                  rowIndex === selectedCell.row && colIndex === selectedCell.col
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
        <Button onClick={handleSave}>Save State</Button>
        <Button onClick={handleLoad}>Load State</Button>
      </CardFooter>
    </Card>
  );
};

export default Crossword;
