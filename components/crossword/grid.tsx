"use client";

import React, { useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  } = useCrosswordGrid(5, 5);

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

  return (
    <Card className="p-4 w-full max-w-md mx-auto">
      <CardContent className="p-0">
        <div className="grid grid-cols-5 gap-2">
          {grid.map((row: string[], rowIndex: number) =>
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
                rowIndex={rowIndex}
                colIndex={colIndex}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Crossword;
