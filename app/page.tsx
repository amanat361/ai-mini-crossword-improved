import Crossword from "@/components/crossword/grid";
import { generatePuzzle } from "@/utils/generateCrossword";

export default async function Home() {
  const puzzle = await generatePuzzle();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Crossword initialPuzzle={puzzle} />
    </main>
  );
}
