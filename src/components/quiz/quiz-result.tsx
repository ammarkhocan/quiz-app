import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, LogOut } from "lucide-react";
import { formatTime } from "@/lib/quiz-helpers";

interface QuizResultProps {
  username: string;
  score: number;
  wrong: number;
  timeLeft: number;
  totalQuestions: number;
  onRestart: () => void;
  onLogout: () => void;
}

export function QuizResult({
  username,
  score,
  wrong,
  timeLeft,
  totalQuestions,
  onRestart,
  onLogout,
}: QuizResultProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {timeLeft === 0 ? "Time's Up! ⏰" : "Quiz Completed! 🎉"}
          </CardTitle>
          <CardDescription>
            Great job,{" "}
            <span className="font-bold text-foreground">{username}</span>! You
            finished {totalQuestions} questions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center rounded-lg bg-green-50 p-4 border border-green-100">
              <CheckCircle className="mb-2 h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold text-green-700">{score}</span>
              <span className="text-xs text-green-600">Correct</span>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-red-50 p-4 border border-red-100">
              <XCircle className="mb-2 h-6 w-6 text-red-600" />
              <span className="text-2xl font-bold text-red-700">{wrong}</span>
              <span className="text-xs text-red-600">Wrong</span>
            </div>
          </div>
          <div className="rounded-md bg-slate-100 p-3 text-center text-sm font-medium text-slate-600">
            Time remaining: {formatTime(timeLeft)}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={onRestart}>
            Play Again
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
