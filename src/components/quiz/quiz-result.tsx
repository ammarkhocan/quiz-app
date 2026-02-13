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

interface Props {
  username: string;
  score: number;
  wrong: number;
  timeLeft: number;
  totalQuestions: number;
  onRestart: () => void;
  onLogout: () => void;
}

export function QuizResult(props: Props) {
  const {
    username,
    score,
    wrong,
    timeLeft,
    totalQuestions,
    onRestart,
    onLogout,
  } = props;

  const percentage = Math.round((score / totalQuestions) * 100);

  const getMessage = () => {
    if (timeLeft === 0) return "Waktu Habis!";
    if (percentage > 70) return "Hebat Banget!";
    return "Selesai! 👍";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{getMessage()}</CardTitle>
          <CardDescription>
            Halo <span className="font-bold text-primary">{username}</span>,
            kamu sudah menjawab {totalQuestions} soal.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center rounded-lg bg-green-100 p-4 border border-green-200">
              <CheckCircle className="mb-2 h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold text-green-700">{score}</span>
              <span className="text-xs text-green-600 font-semibold">
                Benar
              </span>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-red-100 p-4 border border-red-200">
              <XCircle className="mb-2 h-6 w-6 text-red-600" />
              <span className="text-2xl font-bold text-red-700">{wrong}</span>
              <span className="text-xs text-red-600 font-semibold">Salah</span>
            </div>
          </div>

          <div className="rounded-md bg-slate-100 p-3 text-center text-sm font-medium text-slate-600">
            Sisa Waktu: {formatTime(timeLeft)}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={onRestart}>
            Main Lagi
          </Button>

          <Button
            variant="ghost"
            className="w-full text-slate-500 hover:text-red-500"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Keluar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
