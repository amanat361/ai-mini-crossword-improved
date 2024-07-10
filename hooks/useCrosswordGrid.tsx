// hooks/useCrosswordGrid.ts
import { useState, useCallback } from "react";

type Grid = string[][];

const useCrosswordGrid = (
  initialRows: number,
  initialCols: number,
  initialGrid?: Grid
) => {
  const [grid, setGrid] = useState<Grid>(
    initialGrid || Array(initialRows).fill(Array(initialCols).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const updateCell = useCallback(
    (value: string) => {
      setGrid((prev) =>
        prev.map((row, r) =>
          row.map((cell, c) =>
            r === selectedCell.row && c === selectedCell.col ? value : cell
          )
        )
      );
    },
    [selectedCell]
  );

  const moveToNextCell = useCallback(() => {
    setSelectedCell((prev) => {
      if (prev.col < grid[0].length - 1) return { ...prev, col: prev.col + 1 };
      if (prev.row < grid.length - 1) return { row: prev.row + 1, col: 0 };
      return prev;
    });
  }, [grid]);

  const moveToPreviousCell = useCallback(() => {
    setSelectedCell((prev) => {
      if (prev.col > 0) return { ...prev, col: prev.col - 1 };
      if (prev.row > 0) return { row: prev.row - 1, col: grid[0].length - 1 };
      return prev;
    });
  }, [grid]);

  const moveDown = useCallback(() => {
    setSelectedCell((prev) =>
      prev.row < grid.length - 1 ? { ...prev, row: prev.row + 1 } : prev
    );
  }, [grid]);

  const moveUp = useCallback(() => {
    setSelectedCell((prev) =>
      prev.row > 0 ? { ...prev, row: prev.row - 1 } : prev
    );
  }, []);

  const getCurrentState = useCallback(() => {
    return grid;
  }, [grid]);

  const setGridState = useCallback((newGrid: Grid) => {
    setGrid(newGrid);
  }, []);

  return {
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
  };
};

export default useCrosswordGrid;
