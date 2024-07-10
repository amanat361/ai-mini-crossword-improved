// utils/gridWordConversion.ts

export function gridToWords(grid: string[][]): string[] {
  const words: string[] = [];

  // Horizontal words
  grid.forEach((row) => {
    words.push(row.join(""));
  });

  // Vertical words
  for (let col = 0; col < grid[0].length; col++) {
    let word = "";
    for (let row = 0; row < grid.length; row++) {
      word += grid[row][col];
    }
    words.push(word);
  }

  return words;
}

export function wordsToGrid(
  words: string[],
  rows: number,
  cols: number
): string[][] {
  const grid: string[][] = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(""));

  // Fill horizontal words
  for (let i = 0; i < rows; i++) {
    const word = words[i];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = word[j] || "";
    }
  }

  // Fill vertical words
  for (let j = 0; j < cols; j++) {
    const word = words[rows + j];
    for (let i = 0; i < rows; i++) {
      if (word[i] && grid[i][j] === "") {
        grid[i][j] = word[i];
      }
    }
  }

  return grid;
}
