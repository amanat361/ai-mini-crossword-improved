import Crossword from "@/components/crossword/grid";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-6">Crossword Puzzle</h1>
      <Crossword />
    </main>
  );
}
