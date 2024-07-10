import type { Clue } from "@/hooks/useCrosswordPuzzle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CrosswordClue({ clue }: { clue: Clue }) {
  return (
    <div className="flex gap-6 items-center">
      <span>{clue.number}</span>
      <Card className="flex-1">
        <CardHeader>
          {clue.text}
        </CardHeader>
      </Card>
    </div>
  );
}
