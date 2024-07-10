// hooks/useCrosswordGrid.ts
import { useState, useCallback } from "react";

const useCrosswordGrid = (rows: number, cols: number) => {
  const [grid, setGrid] = useState(Array(rows).fill(Array(cols).fill("")));
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  const updateCell = useCallback(
    (value: string) => {
      setGrid((prev) =>
        prev.map((row, r) =>
          row.map((cell: string, c: number) =>
            r === selectedCell.row && c === selectedCell.col ? value : cell
          )
        )
      );
    },
    [selectedCell]
  );

  const moveToNextCell = useCallback(() => {
    setSelectedCell((prev) => {
      if (prev.col < cols - 1) return { ...prev, col: prev.col + 1 };
      if (prev.row < rows - 1) return { row: prev.row + 1, col: 0 };
      return prev;
    });
  }, [rows, cols]);

  const moveToPreviousCell = useCallback(() => {
    setSelectedCell((prev) => {
      if (prev.col > 0) return { ...prev, col: prev.col - 1 };
      if (prev.row > 0) return { row: prev.row - 1, col: cols - 1 };
      return prev;
    });
  }, [cols]);

  const moveDown = useCallback(() => {
    setSelectedCell((prev) =>
      prev.row < rows - 1 ? { ...prev, row: prev.row + 1 } : prev
    );
  }, [rows]);

  const moveUp = useCallback(() => {
    setSelectedCell((prev) =>
      prev.row > 0 ? { ...prev, row: prev.row - 1 } : prev
    );
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
  };
};

export default useCrosswordGrid;
