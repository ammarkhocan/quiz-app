import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { formatTime } from "@/lib/quiz-helpers";
import type { QuestionState } from "@/modules/quiz/type";

interface QuizQuestionProps {
  question: QuestionState;
  currentIndex: number;
  totalQuestions: number;
  timeLeft: number;
  userAnswer: string | null;
  onAnswer: (ans: string) => void;
}

export function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  timeLeft,
  userAnswer,
  onAnswer,
}: QuizQuestionProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const getButtonVariant = (ans: string) => {
    if (!userAnswer) return "outline";
    if (ans === question.correct_answer) return "default";
    if (ans === userAnswer) return "destructive";
    return "secondary";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-xl space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-white">
            Question {currentIndex + 1} / {totalQuestions}
          </Badge>
          <div
            className={`flex items-center gap-2 font-mono font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-slate-700"}`}
          >
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <Card className="border-t-4 border-t-primary shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {question.answers.map((ans, idx) => (
              <Button
                key={idx}
                variant={getButtonVariant(ans)}
                className={`justify-start py-6 text-left whitespace-normal ${
                  userAnswer && ans === question.correct_answer
                    ? "bg-green-600 hover:bg-green-700"
                    : ""
                }`}
                onClick={() => onAnswer(ans)}
                disabled={!!userAnswer}
              >
                {ans}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
